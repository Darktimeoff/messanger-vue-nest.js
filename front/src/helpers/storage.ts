export function get<D, T>(name: string, def?: T): D {
    return JSON.parse(
      localStorage.getItem(name) || JSON.parse(JSON.stringify(def))
    );
  }
  
  export function set<D>(name: string, value: D) {
    localStorage.setItem(name, JSON.stringify(value));
  }