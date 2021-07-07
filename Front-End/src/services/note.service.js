import http from "../http-common";

class NoteDataService {
  getAll() {
    return http.get("/notes");
  }

  get(id) {
    return http.get(`/searchNote/${id}`);
  }

  create(data) {
    return http.post("/createNote", data);
  }

  update(id, data) {
    return http.put(`/updateNote/${id}`, data);
  }

  delete(id) {
    return http.delete(`/deleteNote/${id}`);
  }

  deleteAll() {
    return http.delete(`/deleteNotes`);
  }

  findByTitle(title) {
    return http.get(`/notes?title=${title}`);
  }
}

export default new NoteDataService();