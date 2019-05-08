// matches the dutch zip system `0000AA`
const postcode = code => /^[0-9]{4}[A-Za-z]{2}$/.test(code);

// matches dutch phone numbers `+31600000000`
const phone = number => {
  const landline = /^(((0)[1-9]{2}[0-9][-]?[1-9][0-9]{5})|((\+31|0|0031)[1-9][0-9][-]?[1-9][0-9]{6}))$/;
  const cellphone = /^(((\+31|0|0031)6){1}[1-9]{1}[0-9]{7})$/i;
  return landline.test(number) || cellphone.test(number);
};

export default { postcode, phone };
