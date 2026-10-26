import React, { useState, useEffect } from 'react';
import siteConfig from '../siteConfig';
import Card from './ui/Card';
import Button from './ui/Button';
import Modal from './ui/Modal';
import Input from './ui/Input';

function Gifts({ embedded = false }) {
  const { registries = [], cashFunds = [], thankYouMessage } = siteConfig.registry || {};
  const [reservations, setReservations] = useState({});
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);
  const [reserveForm, setReserveForm] = useState({ name: '', email: '' });
  const [reserveLoading, setReserveLoading] = useState(false);
  const [reserveError, setReserveError] = useState('');

  // Load gift reservations
  useEffect(() => {
    const loadReservations = async () => {
      try {
        const response = await fetch('/.netlify/functions/gift-status');
        const data = await response.json();
        if (data.success) {
          setReservations(data.reservations || {});
        }
      } catch (error) {
        console.error('Error loading reservations:', error);
      }
    };

    if (siteConfig.registry?.enableGiftTracking) {
      loadReservations();
    }
  }, []);

  const handleReserveClick = (gift) => {
    setSelectedGift(gift);
    setShowReserveModal(true);
    setReserveForm({ name: '', email: '' });
    setReserveError('');
  };

  const handleReserveSubmit = async (e) => {
    e.preventDefault();
    
    if (!reserveForm.name || !reserveForm.email) {
      setReserveError('Please fill in all fields');
      return;
    }

    setReserveLoading(true);
    setReserveError('');

    try {
      const response = await fetch('/.netlify/functions/gift-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          giftId: selectedGift.id,
          giftName: selectedGift.name,
          reservedBy: `${reserveForm.name} (${reserveForm.email})`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Update local state
        setReservations({
          ...reservations,
          [selectedGift.id]: {
            giftName: selectedGift.name,
            reservedBy: `${reserveForm.name} (${reserveForm.email})`,
            reservedDate: new Date().toISOString(),
          },
        });
        setShowReserveModal(false);
        alert('Gift reserved successfully! Thank you!');
      } else {
        setReserveError(data.message || 'Failed to reserve gift');
      }
    } catch (error) {
      console.error('Error reserving gift:', error);
      setReserveError('An error occurred. Please try again.');
    } finally {
      setReserveLoading(false);
    }
  };

  const isReserved = (giftId) => {
    return !!reservations[giftId];
  };

  return (
    <div id={embedded ? 'gifts' : undefined} className={`min-h-screen bg-ivory-50 ${embedded ? 'scroll-mt-20 py-20' : 'pt-28 pb-26'}`}>
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="section-header text-4xl sm:text-title font-semibold text-sage-900">
            {siteConfig.registry?.title || 'Gifts'}
          </h1>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            {siteConfig.registry?.subtitle || "Your presence is the greatest gift, but if you'd like to honor us with something special..."}
          </p>
        </div>

        {/* Registries */}
        {registries.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-sage-900 mb-6 text-center">
              Gift Registries
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {registries.map((registry, index) => {
                const giftId = `registry-${index}`;
                const reserved = isReserved(giftId);
                
                return (
                  <Card key={index} className="p-6 text-center relative">
                    {reserved && (
                      <div className="absolute top-4 right-4 bg-rose-100 text-rose-900 border border-rose-200 text-xs px-2 py-1 rounded-full font-medium">
                        Reserved
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-sage-900 mb-2">
                      {registry.name}
                    </h3>
                    {registry.description && (
                      <p className="text-sage-600 mb-4">{registry.description}</p>
                    )}
                    {reserved && (
                      <p className="text-sm text-sage-600 mb-4 italic">
                        Reserved by: {reservations[giftId]?.reservedBy}
                      </p>
                    )}
                    <div className="flex flex-col gap-2">
                      <a href={registry.url} target="_blank" rel="noopener noreferrer">
                        <Button variant="primary" className="w-full">Visit Registry</Button>
                      </a>
                      {siteConfig.registry?.enableGiftTracking && !reserved && (
                        <Button
                          variant="secondary"
                          onClick={() => handleReserveClick({ id: giftId, name: registry.name })}
                          className="w-full"
                        >
                          Mark as Reserved
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Cash Funds */}
        {cashFunds.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-sage-900 mb-6 text-center">
              Cash Funds
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {cashFunds.map((fund, index) => (
                <Card key={index} className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-sage-900 mb-2">
                    {fund.name}
                  </h3>
                  {fund.description && (
                    <p className="text-sage-600 mb-4">{fund.description}</p>
                  )}
                  {fund.paybill && (
                    <div className="text-left space-y-1 mb-5 text-sage-700">
                      <h4 className="font-semibold text-sage-900">Preferred option: M-Pesa Paybill</h4>
                      <p>Paybill: {fund.paybill.number}</p>
                      <p>Account Number: {fund.paybill.accountNumber}</p>
                      <p>Account Name/Reference: {fund.paybill.accountName}</p>
                    </div>
                  )}
                  {fund.phoneNumbers?.length > 0 && (
                    <div className="text-left space-y-2 mb-5">
                      <h4 className="font-semibold text-sage-900">Or send directly to M-Pesa</h4>
                      {fund.phoneNumbers.map((contact) => (
                        <a
                          key={contact.name}
                          href={`tel:${contact.number}`}
                          className="block text-sage-700 underline"
                        >
                          {contact.name}: {contact.number}
                        </a>
                      ))}
                    </div>
                  )}
                  {fund.internationalBank && (
                    <div className="text-left space-y-1 text-sage-700">
                      <h4 className="font-semibold text-sage-900">
                        For our international friends
                      </h4>
                      <p>Bank Name: {fund.internationalBank.bankName}</p>
                      <p>Account Name: {fund.internationalBank.accountName}</p>
                      <p>Sort Code: {fund.internationalBank.sortCode}</p>
                      <p>Account Number: {fund.internationalBank.accountNumber}</p>
                    </div>
                  )}
                  {fund.url && (
                    <a href={fund.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="secondary">Contribute</Button>
                    </a>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Thank You Message */}
        {thankYouMessage && (
          <div className="text-center mt-12">
            <p className="text-lg text-sage-700 italic">{thankYouMessage}</p>
          </div>
        )}

        {registries.length === 0 && cashFunds.length === 0 && (
          <div className="text-center py-20">
            <p className="text-sage-600 text-lg">Gift information coming soon!</p>
          </div>
        )}

        {/* Reserve Gift Modal */}
        <Modal
          isOpen={showReserveModal}
          onClose={() => {
            setShowReserveModal(false);
            setReserveError('');
          }}
          title="Reserve Gift"
        >
          <form onSubmit={handleReserveSubmit} className="space-y-4">
            <p className="text-sage-600 mb-4">
              Reserve <strong>{selectedGift?.name}</strong> to let others know you're planning to purchase it.
            </p>
            
            <div>
              <label className="block text-sm font-medium text-sage-700 mb-2">
                Your Name
              </label>
              <Input
                type="text"
                placeholder="Your name"
                value={reserveForm.name}
                onChange={(e) => setReserveForm({ ...reserveForm, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-sage-700 mb-2">
                Your Email
              </label>
              <Input
                type="email"
                placeholder="Your email"
                value={reserveForm.email}
                onChange={(e) => setReserveForm({ ...reserveForm, email: e.target.value })}
                required
              />
            </div>

            {reserveError && (
              <div className="p-3 bg-[var(--w-highlight-bg)] text-[var(--w-highlight-text)] rounded-lg text-sm">
                {reserveError}
              </div>
            )}

            <div className="flex gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setShowReserveModal(false);
                  setReserveError('');
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={reserveLoading}
                className="flex-1"
              >
                {reserveLoading ? 'Reserving...' : 'Reserve Gift'}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default Gifts;
