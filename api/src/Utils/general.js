const where = param => {
  const isUUID = id => id.match(/[\w]{8}-[\w]{4}-[\w]{4}-[\w]{4}-[\w]{12}/);
  return isUUID(param) ? { guid: param } : { id: parseInt(param, 10) };
};

const paginate = (filters, defaults = {}) => {
  const selection = {
    limit: 10,
    offset: 0,
    ...defaults
  };

  if (filters.limit) {
    selection.limit = filters.limit;
  }
  if (filters.offset) {
    selection.offset = filters.offset;
  }
  if (filters.page) {
    selection.offset = selection.limit * (filters.page - 1);
  }
  return selection;
};

export { where, paginate };
