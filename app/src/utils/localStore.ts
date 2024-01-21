type LocalStore = {
  post: (id: string, value: unknown) => void;
  getData: (id: string) => unknown | null;
  delete: (id: string) => void;
};

const localStore: LocalStore = {
  post(id, value) {
    const data = {
      id,
      data: value,
      time: new Date(),
    };

    localStorage.setItem(String(id), JSON.stringify(data));
  },

  getData(id) {
    const data = localStorage.getItem(id);

    if (data) {
      return JSON.parse(data).data;
    }

    return null;
  },

  delete(id) {
    localStorage.removeItem(String(id));
  },
};

export default localStore;
