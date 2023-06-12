import React, { useState, ChangeEvent } from 'react';

const CardInfo: React.FC<{ onCardInfoChange: (completed: boolean) => void }> = ({ onCardInfoChange }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value);
    checkCardInfoCompletion();
  };

  const handleCvvChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCvv(e.target.value);
    checkCardInfoCompletion();
  };

  const handleExpirationDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExpirationDate(e.target.value);
    checkCardInfoCompletion();
  };

  const handleFullNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
    checkCardInfoCompletion();
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    checkCardInfoCompletion();
  };

  const checkCardInfoCompletion = () => {
    const isCompleted =
      cardNumber.trim() !== '' &&
      cvv.trim() !== '' &&
      expirationDate.trim() !== '' &&
      fullName.trim() !== '' &&
      email.trim() !== '';

    onCardInfoChange(isCompleted);
  };


  return (
    <div className="form">
    <div className="l1">
    <label>Card Num.</label>
    <input
      type="text"
      value={cardNumber}
      onChange={handleCardNumberChange}
      maxLength={16}
      pattern="[0-9]{16}"
      placeholder='Card Number'
      required
    />
    </div>
    <div className="l2">
      <label>CVV: </label>
      <input
        type="text"
        value={cvv}
        onChange={handleCvvChange}
        maxLength={3}
        pattern="[0-9]{3}"
        placeholder='CVV'
        required
      />
      </div>
    <div className="l3">
      <label>Exp. Date: </label>
      <input
        type="text"
        value={expirationDate}
        onChange={handleExpirationDateChange}
        placeholder="MM/YYYY"
        maxLength={7}
        pattern="(0[1-9]|1[0-2])\/20[2-9][0-9]"
        required
      />
    </div>
    <div className="l4">
    <label>Full Name</label>
    <input
      type="text"
      value={fullName}
      onChange={handleFullNameChange}
      placeholder='Full Name'
      required
    />
    </div>
    <div className="l5">
    <label>Email</label>
    <input
      type="email"
      value={email}
      onChange={handleEmailChange}
      placeholder='Email'
      required
    />
    </div>
  </div>

  );
};

export default CardInfo;