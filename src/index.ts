export default (qrcode: string) => {
  let qr = qrcode;
  let tagLength = 2;
  let valueLength = tagLength + 2;
  let response = {};
  while (qr.length > 0) {
    let tag = qr.slice(0, tagLength);
    let length = qr.slice(tagLength, valueLength);
    let value: any = qr.slice(valueLength, parseInt(length, 10) + valueLength);
    if (hasSubValue(Number(tag))) {
      value = decodeSubTLV(value);
    }
    response[tag] = value;
    qr = qr.slice(parseInt(length, 10) + valueLength);
  }
  return response;
};

const decodeSubTLV = (subTLV: string) => {
  let qr = subTLV;
  let tagLength = 2;
  let valueLength = tagLength + 2;
  let response = {};
  while (qr.length > 0) {
    const tag = qr.slice(0, tagLength);
    const length = qr.slice(tagLength, valueLength);
    const value = qr.slice(valueLength, parseInt(length, 10) + valueLength);
    response[tag] = value;
    qr = qr.slice(parseInt(length, 10) + valueLength);
  }
  return response;
};

const hasSubValue = (tag: number) => {
  if ((tag >= 2 && tag <= 51) || (tag >= 80 && tag <= 99) || tag === 62) {
    return true;
  }
  return false;
};
