export const MASK = {
  CPF: '999.999.999-99',
  CNPJ: '99.999.999/9999-99',
  CELLPHONE: '(99) 99999-9999',
  PHONE: '(99) 9999-9999',
};

export const getPhoneTypeMask = (value: string | undefined) => {
  if (!value) return MASK.PHONE;
  const phone = value.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s/g, '');

  return phone.length >= 10 && phone[2] === '9' ? MASK.CELLPHONE : MASK.PHONE;
};
