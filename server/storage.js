import { randomUUID } from "crypto";

export class MemStorage {
  constructor() {
    this.contactSubmissions = new Map();
  }

  async createContactSubmission(insertContact) {
    const id = randomUUID();
    const contact = {
      ...insertContact,
      id,
      submittedAt: new Date(),
    };
    this.contactSubmissions.set(id, contact);
    return contact;
  }

  async getContactSubmissions() {
    return Array.from(this.contactSubmissions.values()).sort(
      (a, b) => b.submittedAt.getTime() - a.submittedAt.getTime()
    );
  }
}

export const storage = new MemStorage();
