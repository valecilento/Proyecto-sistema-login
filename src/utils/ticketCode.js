export const ticketCode = () => {
  return `TICKET-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};