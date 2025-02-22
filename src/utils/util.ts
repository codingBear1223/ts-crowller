interface Result {
  success: boolean;
  errMsg?: string;
  data: any;
}

export const getResponseData = (data: any, errMsg?: string) => {
  if (errMsg) {
    return {
      success: false,
      errMsg,
      data,
    };
  }
  return {
    success: true,
    data,
  };
};
