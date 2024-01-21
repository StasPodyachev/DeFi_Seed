type SessionStore = {
  post: (id: string, value: unknown) => void;
  getData: (id: string) => any;
  delete: (id: string) => void;
};

const sessionStore: SessionStore = {
  post(id, value) {
    const data = {
      id,
      data: value,
      time: new Date(),
    };

    sessionStorage.setItem(String(id), JSON.stringify(data));
  },

  getData(id) {
    if (typeof window === 'undefined') return null;

    const data = sessionStorage.getItem(id);

    if (data) {
      return JSON.parse(data).data;
    }

    return null;
  },
  
  delete(id) {
    sessionStorage.removeItem(String(id));
  },
};

export default sessionStore;
