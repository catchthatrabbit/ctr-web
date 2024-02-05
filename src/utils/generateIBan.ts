export const generateIBan = (address:string):string =>{
    if(!address)
      return "";
    const iban = address.match(/.{1,4}/g);
    return iban.join(' ').toUpperCase();
  }
  