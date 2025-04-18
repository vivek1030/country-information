export const sendResponse = (
  res: any,
  statusCode: number,
  status: string,
  message: string,
  data: any = null,
) => {
  res.status(statusCode).json({
    status,
    message,
    data,
  });
};
