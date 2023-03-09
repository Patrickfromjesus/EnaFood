import crypto from 'crypto';

const hashPass = (pass: string) => {
  const hashed = crypto.createHash('md5').update(pass).digest('hex');
  return hashed;
}

export default hashPass;
