import HttpStatusCodeClasses from '../enums/http-status-code-classes';

export const getHttpStatusCodeClass = (statusCode) => {
  const code = typeof statusCode === 'string' ? statusCode : statusCode.toString();

  if (code[0] === '4') {
    return HttpStatusCodeClasses.CLIENT_ERROR;
  }

  if (code[0] === '5') {
    return HttpStatusCodeClasses.SERVER_ERROR;
  }
};
