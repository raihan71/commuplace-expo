export const currencyFormat = (number:any)=>{
  return new Intl.NumberFormat('id-ID', {}).format(number);
};

export default currencyFormat;