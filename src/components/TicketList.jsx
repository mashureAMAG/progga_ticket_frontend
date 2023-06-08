export default function TicketList({tickets}) {

  const renderedTickets = tickets.map((ticket, index) => <li key = {index}> {ticket.name}</li>)
  return (
    <div>
        {renderedTickets}
    </div>
  )
}
