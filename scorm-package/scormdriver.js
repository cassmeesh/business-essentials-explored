/**
 * SCORM 1.2 API Wrapper
 * =====================
 * This file provides a JavaScript interface for communicating with the LMS.
 * 
 * SCORM 1.2 Data Model Elements Used:
 * - cmi.core.lesson_status: "incomplete", "completed", "passed", "failed"
 * - cmi.core.score.raw: Numeric score (0-100)
 * - cmi.core.score.min: Minimum possible score
 * - cmi.core.score.max: Maximum possible score
 * - cmi.suspend_data: Free-form data for bookmarking (max 4096 chars)
 * - cmi.core.lesson_location: Bookmark location (max 255 chars)
 * - cmi.core.session_time: Time spent in current session (HH:MM:SS format)
 * 
 * LMS Communication Flow:
 * 1. LMSInitialize() - Start session
 * 2. LMSGetValue() / LMSSetValue() - Read/write data
 * 3. LMSCommit() - Save changes
 * 4. LMSFinish() - End session
 */

var SCORM = (function() {
    'use strict';
    
    // =========================================================================
    // Private Variables
    // =========================================================================
    
    var API = null;              // Reference to the LMS API
    var initialized = false;     // Track if we've initialized
    var finished = false;        // Track if we've finished
    var startTime = null;        // Session start time for duration tracking
    var debugMode = true;        // Enable console logging for debugging
    
    // =========================================================================
    // Private Methods - API Discovery
    // =========================================================================
    
    /**
     * Searches for the SCORM API in parent/opener windows.
     * The LMS typically provides the API object in a parent frame.
     * SCORM 1.2 API is named "API"
     * 
     * @param {Window} win - Window to search in
     * @returns {Object|null} - The API object or null
     */
    function findAPI(win) {
        var attempts = 0;
        var maxAttempts = 500; // Prevent infinite loops
        
        // Search up the window hierarchy
        while ((!win.API) && (win.parent) && (win.parent != win) && (attempts < maxAttempts)) {
            attempts++;
            win = win.parent;
        }
        
        if (win.API) {
            log('API found in parent window after ' + attempts + ' attempts');
            return win.API;
        }
        
        return null;
    }
    
    /**
     * Gets the SCORM API from the window hierarchy.
     * Checks both parent frames and opener windows.
     * 
     * @returns {Object|null} - The API object or null
     */
    function getAPI() {
        var api = null;
        
        // First, try to find API in parent windows
        if (window.parent && window.parent != window) {
            api = findAPI(window.parent);
        }
        
        // If not found, try the opener window (for popup scenarios)
        if (!api && window.opener) {
            api = findAPI(window.opener);
        }
        
        // If still not found, check current window
        if (!api && window.API) {
            api = window.API;
        }
        
        return api;
    }
    
    /**
     * Logs debug messages to console if debug mode is enabled.
     * 
     * @param {string} message - Message to log
     */
    function log(message) {
        if (debugMode && console && console.log) {
            console.log('[SCORM] ' + message);
        }
    }
    
    /**
     * Gets the last error from the LMS and logs it.
     * 
     * @returns {string} - Error code
     */
    function getLastError() {
        if (!API) return 'API not found';
        
        var errorCode = API.LMSGetLastError();
        var errorString = API.LMSGetErrorString(errorCode);
        var diagnostic = API.LMSGetDiagnostic(errorCode);
        
        if (errorCode !== '0') {
            log('Error ' + errorCode + ': ' + errorString);
            if (diagnostic) log('Diagnostic: ' + diagnostic);
        }
        
        return errorCode;
    }
    
    /**
     * Converts milliseconds to SCORM time format (HH:MM:SS.ss)
     * 
     * @param {number} ms - Milliseconds
     * @returns {string} - SCORM formatted time
     */
    function formatTime(ms) {
        var hours = Math.floor(ms / 3600000);
        var minutes = Math.floor((ms % 3600000) / 60000);
        var seconds = Math.floor((ms % 60000) / 1000);
        
        // Pad with zeros
        var h = (hours < 10 ? '0' : '') + hours;
        var m = (minutes < 10 ? '0' : '') + minutes;
        var s = (seconds < 10 ? '0' : '') + seconds;
        
        return h + ':' + m + ':' + s;
    }
    
    // =========================================================================
    // Public Methods
    // =========================================================================
    
    return {
        /**
         * Initialize communication with the LMS.
         * Must be called before any other SCORM operations.
         * 
         * @returns {boolean} - Success status
         */
        initialize: function() {
            log('Attempting to initialize...');
            
            if (initialized) {
                log('Already initialized');
                return true;
            }
            
            // Find the API
            API = getAPI();
            
            if (!API) {
                log('WARNING: SCORM API not found. Running in standalone mode.');
                log('Data will be saved to localStorage instead.');
                initialized = true;
                startTime = new Date();
                return true;
            }
            
            // Initialize the LMS session
            var result = API.LMSInitialize('');
            
            if (result === 'true' || result === true) {
                initialized = true;
                startTime = new Date();
                log('Successfully initialized');
                
                // Set initial status if not already set
                var currentStatus = this.getValue('cmi.core.lesson_status');
                if (currentStatus === 'not attempted' || currentStatus === '') {
                    this.setValue('cmi.core.lesson_status', 'incomplete');
                }
                
                return true;
            } else {
                getLastError();
                log('Initialize failed');
                return false;
            }
        },
        
        /**
         * Get a value from the LMS.
         * 
         * @param {string} element - The CMI element to retrieve
         * @returns {string} - The value or empty string
         */
        getValue: function(element) {
            if (!initialized) {
                log('Cannot getValue - not initialized');
                return '';
            }
            
            if (!API) {
                // Standalone mode - use localStorage
                var value = localStorage.getItem('scorm_' + element) || '';
                log('getValue (localStorage): ' + element + ' = ' + value);
                return value;
            }
            
            var value = API.LMSGetValue(element);
            var error = getLastError();
            
            if (error === '0') {
                log('getValue: ' + element + ' = ' + value);
            }
            
            return value;
        },
        
        /**
         * Set a value in the LMS.
         * 
         * @param {string} element - The CMI element to set
         * @param {string} value - The value to set
         * @returns {boolean} - Success status
         */
        setValue: function(element, value) {
            if (!initialized) {
                log('Cannot setValue - not initialized');
                return false;
            }
            
            if (!API) {
                // Standalone mode - use localStorage
                localStorage.setItem('scorm_' + element, value);
                log('setValue (localStorage): ' + element + ' = ' + value);
                return true;
            }
            
            var result = API.LMSSetValue(element, value);
            var error = getLastError();
            
            if (result === 'true' || result === true) {
                log('setValue: ' + element + ' = ' + value);
                return true;
            } else {
                log('setValue failed for ' + element);
                return false;
            }
        },
        
        /**
         * Commit data to the LMS.
         * Should be called after setting values to ensure they're saved.
         * 
         * @returns {boolean} - Success status
         */
        commit: function() {
            if (!initialized) {
                log('Cannot commit - not initialized');
                return false;
            }
            
            if (!API) {
                log('Commit (localStorage mode) - data already persisted');
                return true;
            }
            
            var result = API.LMSCommit('');
            getLastError();
            
            if (result === 'true' || result === true) {
                log('Commit successful');
                return true;
            } else {
                log('Commit failed');
                return false;
            }
        },
        
        /**
         * Finish the SCORM session.
         * Should be called when the user exits the course.
         * 
         * @returns {boolean} - Success status
         */
        finish: function() {
            if (!initialized) {
                log('Cannot finish - not initialized');
                return false;
            }
            
            if (finished) {
                log('Already finished');
                return true;
            }
            
            // Calculate and set session time
            if (startTime) {
                var sessionTime = new Date() - startTime;
                this.setValue('cmi.core.session_time', formatTime(sessionTime));
            }
            
            this.commit();
            
            if (!API) {
                log('Finish (standalone mode)');
                finished = true;
                return true;
            }
            
            var result = API.LMSFinish('');
            getLastError();
            
            if (result === 'true' || result === true) {
                finished = true;
                log('Finish successful');
                return true;
            } else {
                log('Finish failed');
                return false;
            }
        },
        
        // =====================================================================
        // Convenience Methods - Wrap common operations
        // =====================================================================
        
        /**
         * Set the lesson status.
         * Valid values: "incomplete", "completed", "passed", "failed"
         * 
         * @param {string} status - The status to set
         */
        setStatus: function(status) {
            this.setValue('cmi.core.lesson_status', status);
            this.commit();
        },
        
        /**
         * Get the current lesson status.
         * 
         * @returns {string} - Current status
         */
        getStatus: function() {
            return this.getValue('cmi.core.lesson_status');
        },
        
        /**
         * Set the score.
         * Automatically sets min/max and determines pass/fail.
         * 
         * @param {number} score - Score value (0-100)
         * @param {number} passingScore - Minimum passing score (default 80)
         */
        setScore: function(score, passingScore) {
            passingScore = passingScore || 80;
            
            this.setValue('cmi.core.score.raw', score.toString());
            this.setValue('cmi.core.score.min', '0');
            this.setValue('cmi.core.score.max', '100');
            
            // Determine pass/fail based on score
            if (score >= passingScore) {
                this.setStatus('passed');
            } else {
                this.setStatus('failed');
            }
        },
        
        /**
         * Get the current score.
         * 
         * @returns {number} - Current score or 0
         */
        getScore: function() {
            var score = this.getValue('cmi.core.score.raw');
            return score ? parseInt(score, 10) : 0;
        },
        
        /**
         * Save bookmark/progress data.
         * Use this to save the user's position in the course.
         * 
         * @param {string} location - Current lesson/page identifier
         * @param {Object} data - Additional data to save
         */
        saveProgress: function(location, data) {
            // Save current location (max 255 chars)
            this.setValue('cmi.core.lesson_location', location);
            
            // Save additional data as JSON in suspend_data (max 4096 chars)
            if (data) {
                try {
                    var jsonData = JSON.stringify(data);
                    this.setValue('cmi.suspend_data', jsonData);
                } catch (e) {
                    log('Error saving suspend_data: ' + e.message);
                }
            }
            
            this.commit();
        },
        
        /**
         * Load saved progress data.
         * 
         * @returns {Object} - Object with location and data properties
         */
        loadProgress: function() {
            var location = this.getValue('cmi.core.lesson_location');
            var suspendData = this.getValue('cmi.suspend_data');
            var data = null;
            
            if (suspendData) {
                try {
                    data = JSON.parse(suspendData);
                } catch (e) {
                    log('Error parsing suspend_data: ' + e.message);
                }
            }
            
            return {
                location: location,
                data: data
            };
        },
        
        /**
         * Mark the course as complete.
         * Sets status to "completed" and commits.
         */
        complete: function() {
            this.setStatus('completed');
            this.commit();
        },
        
        /**
         * Check if API is available (running in LMS).
         * 
         * @returns {boolean} - True if LMS API is available
         */
        isLMSAvailable: function() {
            return API !== null;
        }
    };
})();

// =========================================================================
// Auto-initialize on page load
// =========================================================================
window.addEventListener('load', function() {
    SCORM.initialize();
});

// =========================================================================
// Auto-finish on page unload
// =========================================================================
window.addEventListener('beforeunload', function() {
    SCORM.finish();
});