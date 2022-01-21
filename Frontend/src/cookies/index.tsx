import { Cookies } from 'react-cookie';

//sum 15 day date expires to cookie
const dateExpiration = () => {
  const date = new Date();
  let dateDay = date.getDate() + 15;
  let dateMonth = date.getMonth() + 1;
  let dateYear = date.getFullYear();
  if (dateDay > 30) {
    dateDay = dateDay - 30;
    dateMonth = dateMonth + 1;
  }
  if (dateMonth > 12) {
    dateMonth = dateMonth - 12;
    dateYear = dateYear + 1;
  }
  const dateExpiration = new Date(dateYear + '/' + dateMonth + '/' + dateDay);
  return dateExpiration;
};

export function setItemCookie(itemObj) {
  const cookies = new Cookies();
  const arrayItem = cookies.get('itemPurchases') ? cookies.get('itemPurchases') : [];
  cookies.set('itemPurchases', arrayItem.concat(itemObj), { path: '/', expires: dateExpiration() });
}

export function deleteItemCookie(id) {
  const cookies = new Cookies();
  const itemCookie = cookies.get('itemPurchases');
  const newArray = itemCookie.filter((item) => {
    return item.id != id;
  });
  cookies.set('itemPurchases', newArray, { path: '/', expires: dateExpiration() });
}

export function getItemCookie() {
  const cookies = new Cookies();
  return cookies.get('itemPurchases');
}

export function removeItemCookie() {
  const cookies = new Cookies();
  return cookies.remove('itemPurchases', { path: '/' });
}
