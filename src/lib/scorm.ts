/**
 * SCORM 1.2 API Wrapper
 * Handles communication with LMS for tracking course completion
 */

type ScormAPI = {
  LMSInitialize: (param: string) => string;
  LMSFinish: (param: string) => string;
  LMSGetValue: (element: string) => string;
  LMSSetValue: (element: string, value: string) => string;
  LMSCommit: (param: string) => string;
  LMSGetLastError: () => string;
  LMSGetErrorString: (errorCode: string) => string;
  LMSGetDiagnostic: (errorCode: string) => string;
};

class ScormWrapper {
  private api: ScormAPI | null = null;
  private initialized = false;
  private finishOnUnload = true;

  constructor() {
    this.api = this.findAPI(window);
    if (!this.api && window.opener) {
      this.api = this.findAPI(window.opener);
    }
  }

  private findAPI(win: Window): ScormAPI | null {
    let attempts = 0;
    const maxAttempts = 500;

    // Look for API in parent windows
    while (
      !win.API &&
      win.parent &&
      win.parent !== win &&
      attempts < maxAttempts
    ) {
      attempts++;
      win = win.parent;
    }

    if (win.API) {
      return win.API as ScormAPI;
    }

    // Look for API in opener window chain
    if (win.opener && typeof win.opener !== 'undefined') {
      return this.findAPI(win.opener);
    }

    return null;
  }

  /**
   * Initialize connection with LMS
   */
  initialize(): boolean {
    if (this.initialized) return true;
    if (!this.api) {
      console.warn('SCORM API not found - running in standalone mode');
      return false;
    }

    const result = this.api.LMSInitialize('');
    this.initialized = result === 'true';

    if (this.initialized && this.finishOnUnload) {
      window.addEventListener('beforeunload', () => this.terminate());
      window.addEventListener('unload', () => this.terminate());
    }

    return this.initialized;
  }

  /**
   * Terminate connection with LMS
   */
  terminate(): boolean {
    if (!this.initialized || !this.api) return false;
    
    this.commit(); // Save any pending data
    const result = this.api.LMSFinish('');
    this.initialized = false;
    return result === 'true';
  }

  /**
   * Get a value from the LMS
   */
  getValue(element: string): string {
    if (!this.initialized || !this.api) return '';
    return this.api.LMSGetValue(element);
  }

  /**
   * Set a value in the LMS
   */
  setValue(element: string, value: string): boolean {
    if (!this.initialized || !this.api) return false;
    const result = this.api.LMSSetValue(element, value);
    return result === 'true';
  }

  /**
   * Commit data to LMS
   */
  commit(): boolean {
    if (!this.initialized || !this.api) return false;
    const result = this.api.LMSCommit('');
    return result === 'true';
  }

  /**
   * Get the last error code
   */
  getLastError(): string {
    if (!this.api) return '';
    return this.api.LMSGetLastError();
  }

  // ========================================
  // Convenience methods for common operations
  // ========================================

  /**
   * Set lesson status (passed, completed, failed, incomplete, browsed, not attempted)
   */
  setLessonStatus(status: 'passed' | 'completed' | 'failed' | 'incomplete' | 'browsed' | 'not attempted'): boolean {
    return this.setValue('cmi.core.lesson_status', status);
  }

  /**
   * Get current lesson status
   */
  getLessonStatus(): string {
    return this.getValue('cmi.core.lesson_status');
  }

  /**
   * Mark course as complete
   */
  setComplete(): boolean {
    const success = this.setLessonStatus('completed');
    this.commit();
    return success;
  }

  /**
   * Get learner name
   */
  getLearnerName(): string {
    return this.getValue('cmi.core.student_name');
  }

  /**
   * Get learner ID
   */
  getLearnerId(): string {
    return this.getValue('cmi.core.student_id');
  }

  /**
   * Check if running in LMS
   */
  isConnected(): boolean {
    return this.api !== null && this.initialized;
  }
}

// Singleton instance
export const scorm = new ScormWrapper();

// Type declaration for window.API
declare global {
  interface Window {
    API?: ScormAPI;
  }
}
