/*
*                     GNU GENERAL PUBLIC LICENSE
*                        Version 3, 29 June 2007
* 
*  Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
*  Everyone is permitted to copy and distribute verbatim copies
*  of this license document, but changing it is not allowed.
* 
*                             Preamble
* 
*   The GNU General Public License is a free, copyleft license for
* software and other kinds of works.
* 
*   The licenses for most software and other practical works are designed
* to take away your freedom to share and change the works.  By contrast,
* the GNU General Public License is intended to guarantee your freedom to
* share and change all versions of a program--to make sure it remains free
* software for all its users.  We, the Free Software Foundation, use the
* GNU General Public License for most of our software; it applies also to
* any other work released this way by its authors.  You can apply it to
* your programs, too.
*
* Autor: salvgonz 
* Fecha de creación: Feb 15, 2023
*/

const factors = [3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 0];

/*
* Obtiene el digito verificador de una cuenta de 17 digitos
*/
const getVerifierDigit = (cuenta) => {
  const accountDigits = Array.from(cuenta);
  const keyDigit = accountDigits
    .flatMap((x, i) => (x * factors[i]) % 10)
    .reduce((a, b) => a + b) % 10;
  const verifierDigit = (10 - keyDigit) == 10 ? 0 : (10 - keyDigit);

  return verifierDigit;
};

/*
* Valida si la cuenta clabe esta bien formada
* Clabe valida = cuenta de 18 digitos 
* y digito verificador valido
*/
const isValid = (clabe = '') => {

  return new Promise((resolve, reject) => {

    if (isNaN(clabe) || clabe.length != 18) {
      reject({ info: "Cuenta CLABE no valida", status: false });
    }

    const verifierDigit = getVerifierDigit(clabe);
    clabe.charAt(17) === `${verifierDigit}`
      ? resolve({ info: "Cuenta CLABE valida", verifierDigit, status: true })
      : reject({ info: "Cuenta CLABE no valida", status: false });
  });
}

/* 
* Crea la cuenta clabe basado en en tres parametros
*    1) Banco 
*    2) Plaza 
*    3) Numero de cuenta
*/
const buildClabe = (bank = 0, location = 0, account = '') => {
  return new Promise((resolve, reject) => {
    const clabe =
      `${bank}`.padStart(3, '0') +
      `${location}`.padStart(3, '0') +
      account.padStart(11, '0');
    
    (isNaN(bank) || isNaN(location) || isNaN(account)
    || bank >= 1000 || location >= 1000 || account.length >= 12)
      ? reject({error: "Bad request"})
      : resolve(clabe + getVerifierDigit(clabe));
  });
}

module.exports = { isValid, buildClabe };
