import winston from 'winston';
export type Logger = winston.Logger;

export default function CryptoLogger(): Logger {
  return winston.createLogger({
    transports:[
      new winston.transports.Console(),
      new winston.transports.File({ filename:'secure.log', maxsize:1e7, tailable:true })
    ],
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    )
  });
}
