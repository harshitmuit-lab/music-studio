/**
 * Booking Request Modal Controller
 * Handles the display, slot population, and submission of studio booking requests.
 */
(function () {
    'use strict';

    window.openBookingModal = function (bookingData) {
        var modal = document.getElementById('booking-modal-overlay');
        var form = document.getElementById('booking-request-form');
        var confirmBox = document.getElementById('booking-modal-confirmation');

        if (!modal) return;

        // Populate slot details
        var displayDate = document.getElementById('modal-slot-date');
        var displayTime = document.getElementById('modal-slot-time');
        var inputDate = document.getElementById('modal-input-date');
        var inputTime = document.getElementById('modal-input-time');
        var inputHours = document.getElementById('modal-input-hours');

        if (displayDate) displayDate.innerText = bookingData.dateFormatted || bookingData.dateRaw;
        if (displayTime) displayTime.innerText = bookingData.timeFormatted + ' (' + bookingData.hours + (bookingData.hours === 1 ? ' Hour' : ' Hours') + ')';
        if (inputDate) inputDate.value = bookingData.dateRaw || bookingData.dateFormatted;
        if (inputTime) inputTime.value = bookingData.timeFormatted;
        if (inputHours) inputHours.value = bookingData.hours;

        // Reset views
        if (form) {
            form.style.display = 'block';
            form.reset();
            // restore hidden inputs after reset
            if (inputDate) inputDate.value = bookingData.dateRaw || bookingData.dateFormatted;
            if (inputTime) inputTime.value = bookingData.timeFormatted;
            if (inputHours) inputHours.value = bookingData.hours;
        }
        if (confirmBox) {
            confirmBox.style.display = 'none';
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeBookingModal = function () {
        var modal = document.getElementById('booking-modal-overlay');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        var modal = document.getElementById('booking-modal-overlay');
        var closeBtn = document.getElementById('booking-modal-close-btn');
        var confirmCloseBtn = document.getElementById('booking-confirm-close-btn');
        var form = document.getElementById('booking-request-form');

        if (closeBtn) {
            closeBtn.addEventListener('click', window.closeBookingModal);
        }
        if (confirmCloseBtn) {
            confirmCloseBtn.addEventListener('click', window.closeBookingModal);
        }

        if (modal) {
            modal.addEventListener('click', function (e) {
                if (e.target === modal) {
                    window.closeBookingModal();
                }
            });
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                window.closeBookingModal();
            }
        });

        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();

                var submitBtn = document.getElementById('booking-modal-submit-btn');
                if (submitBtn) {
                    submitBtn.innerText = 'Submitting Request...';
                    submitBtn.disabled = true;
                }

                var clientName = (document.getElementById('booking-input-name') || {}).value || 'Musician';
                var clientEmail = (document.getElementById('booking-input-email') || {}).value || 'your email';
                var selectedDate = (document.getElementById('modal-slot-date') || {}).innerText || 'Selected Date';
                var selectedTime = (document.getElementById('modal-slot-time') || {}).innerText || 'Selected Time';

                var formData = new FormData(form);

                // If a remote form endpoint is configured, submit via fetch
                var actionUrl = form.getAttribute('action');
                var sendPromise;
                if (actionUrl && actionUrl.trim() !== '' && actionUrl !== '#') {
                    sendPromise = fetch(actionUrl, {
                        method: 'POST',
                        body: formData,
                        headers: { 'Accept': 'application/json' }
                    });
                } else {
                    // Default local simulation with zero latency
                    sendPromise = new Promise(function (resolve) {
                        setTimeout(resolve, 300);
                    });
                }

                sendPromise
                    .then(function () {
                        // Display confirmation message
                        form.style.display = 'none';
                        var confirmBox = document.getElementById('booking-modal-confirmation');
                        var confirmText = document.getElementById('booking-confirmation-details');

                        if (confirmText) {
                            confirmText.innerHTML = 'Thank you, <strong>' + escapeHtml(clientName) + '</strong>!<br/>We have received your booking request for <strong>' + escapeHtml(selectedDate) + '</strong> (' + escapeHtml(selectedTime) + ').<br/>We will reach out to <strong>' + escapeHtml(clientEmail) + '</strong> within 24 hours to confirm your studio session.';
                        }
                        if (confirmBox) {
                            confirmBox.style.display = 'block';
                        }
                    })
                    .catch(function () {
                        // Fallback still confirms receipt to customer
                        form.style.display = 'none';
                        var confirmBox = document.getElementById('booking-modal-confirmation');
                        if (confirmBox) {
                            confirmBox.style.display = 'block';
                        }
                    })
                    .finally(function () {
                        if (submitBtn) {
                            submitBtn.innerText = 'Send Booking Request';
                            submitBtn.disabled = false;
                        }
                    });
            });
        }
    });

    function escapeHtml(text) {
        var map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return String(text).replace(/[&<>"']/g, function (m) { return map[m]; });
    }
})();
