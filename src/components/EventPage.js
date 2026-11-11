import React from 'react';
import siteConfig from '../siteConfig';
import Card from './ui/Card';

function EventPage({ embedded = false }) {
  const events = siteConfig.events.events;

  // Calendar integration helpers
  const formatDateForCalendar = (dateStr, timeStr) => {
    // Parse date and time
    const [year, month, day] = dateStr.split('-');
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    // Create date object (assuming local timezone)
    const date = new Date(year, month - 1, day, hours, minutes || 0);
    return date;
  };

  const formatICSDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const getGoogleCalendarUrl = (event) => {
    const startDate = formatDateForCalendar(event.date, event.time);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours default
    
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.name,
      dates: `${formatICSDate(startDate)}/${formatICSDate(endDate)}`,
      details: `${event.description || ''}\n\nVenue: ${event.venue}\nDress Code: ${event.dressCode || 'Not specified'}`,
      location: event.venue,
    });
    
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const getOutlookCalendarUrl = (event) => {
    const startDate = formatDateForCalendar(event.date, event.time);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    
    const params = new URLSearchParams({
      subject: event.name,
      startdt: startDate.toISOString(),
      enddt: endDate.toISOString(),
      body: `${event.description || ''}\n\nVenue: ${event.venue}\nDress Code: ${event.dressCode || 'Not specified'}`,
      location: event.venue,
    });
    
    return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
  };

  const downloadICSFile = (event) => {
    const startDate = formatDateForCalendar(event.date, event.time);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wedding Website//EN',
      'BEGIN:VEVENT',
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `SUMMARY:${event.name}`,
      `DESCRIPTION:${event.description || ''}\\n\\nVenue: ${event.venue}\\nDress Code: ${event.dressCode || 'Not specified'}`,
      `LOCATION:${event.venue}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
    
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${event.name.replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Main Content */}
      <div id={embedded ? 'events' : undefined} className={`modern-section min-h-screen ${embedded ? 'scroll-mt-20 py-20' : 'pt-28 pb-26'}`}>
        <div className="section-container">
          {/* Title Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-4 mb-4">
              <h1 className="section-header text-4xl sm:text-title font-semibold text-sage-900">
                {siteConfig.events.title}
              </h1>
              <button
                onClick={() => window.print()}
                className="no-print px-3 py-2 text-sage-600 hover:text-sage-900 transition-colors"
                aria-label="Print page"
                title="Print events"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              </button>
            </div>
            <p className="text-lg text-sage-600 max-w-2xl mx-auto">
              {siteConfig.events.subtitle}
            </p>
          </div>

          {/* Event Details */}
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
            {events.map((event) => (
              <Card
                key={event.id}
                className="modern-panel group overflow-hidden p-0"
              >
                <div className="h-1.5 bg-gradient-to-r from-sage-600 via-rose-400 to-sage-600" />
                <div className="p-6 sm:p-8">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <h2 className="section-subheader text-xl font-semibold text-sage-900">
                      {event.name}
                    </h2>
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-900">
                      Details
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="rounded-xl bg-ivory-50/80 px-4 py-3 text-sage-700">
                        <strong className="mr-1 text-sage-900">Date:</strong> {event.date}
                      </p>
                      <p className="rounded-xl bg-ivory-50/80 px-4 py-3 text-sage-700">
                        <strong className="mr-1 text-sage-900">Time:</strong> {event.time}
                      </p>
                      <p className="rounded-xl bg-ivory-50/80 px-4 py-3 text-sage-700">
                        <strong className="mr-1 text-sage-900">Venue:</strong> {event.venue}
                      </p>
                      <a
                        href="https://maps.app.goo.gl/njMRbcyr46SdzePEA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-wedding-primary inline-block mt-2"
                      >
                        Get Directions
                      </a>
                      {event.dressCode && (
                        <p className="text-sage-700"><strong>Dress Code:</strong> {event.dressCode}</p>
                      )}
                      {event.description && <p className="mt-2 text-sage-600">{event.description}</p>}
                    </div>
                    {event.mapEmbed && (
                      <div className="responsive-frame mt-4 overflow-hidden rounded-2xl border border-white/80 shadow-[0_8px_24px_rgba(38,56,47,0.08)]">
                        <iframe
                          src={event.mapEmbed}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                          title={`${event.name} Location`}
                          className="h-full w-full"
                        />
                      </div>
                    )}

                    {/* Add to Calendar */}
                    <div className="mt-6 border-t border-ivory-200 pt-6">
                      <p className="text-sm font-medium text-sage-700 mb-2">Add to Calendar:</p>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={getGoogleCalendarUrl(event)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-[var(--w-accent)] text-white rounded-full hover:bg-[var(--w-accent-hover)] transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                          </svg>
                          Google
                        </a>
                        <a
                          href={getOutlookCalendarUrl(event)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-[var(--w-accent-hover)] text-white rounded-full hover:bg-sage-800 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v3.75h9v-3.75zM7.5 18v-5.25h9V18h-9z"/>
                          </svg>
                          Outlook
                        </a>
                        <button
                          onClick={() => downloadICSFile(event)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-sage-600 text-white rounded-full hover:bg-sage-700 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Apple/iCal
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-ivory-200 pt-6 text-center">
                      <p className="text-sage-600 mb-4">Kindly let us know if you'll be joining us.</p>
                      <a
                        href="https://forms.gle/21Uj3ux6xYosE1Qg9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-wedding-primary inline-block text-center"
                      >
                        RSVP Now
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default EventPage;