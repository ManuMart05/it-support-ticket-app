const ticketForm = document.getElementById("ticketForm");
const ticketList = document.getElementById("ticketList");

let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

function saveTickets() {
    localStorage.setItem("tickets", JSON.stringify(tickets));
}

function renderTickets() {
    ticketList.innerHTML = "";

    tickets.forEach((ticket, index) => {
        const li = document.createElement("li");
        li.className = `priority-${ticket.priority}`;

        li.innerHTML = `
            <strong>${ticket.issue}</strong><br>
            <span class="status status-${ticket.status}">${ticket.status}</span><br>
            Priority: ${ticket.priority}

            <div class="actions">
                <button onclick="updateStatus(${index})">Update Status</button>
                <button class="delete" onclick="deleteTicket(${index})">Delete</button>
            </div>
        `;

        ticketList.appendChild(li);
    });
}


ticketForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const issue = document.getElementById("issue").value;
    const priority = document.getElementById("priority").value;

    tickets.push({
        issue,
        priority,
        status: "Open"
    });

    saveTickets();
    renderTickets();
    ticketForm.reset();
});

renderTickets();

function updateStatus(index) {
    const statuses = ["Open", "In Progress", "Resolved"];
    const currentIndex = statuses.indexOf(tickets[index].status);
    tickets[index].status = statuses[(currentIndex + 1) % statuses.length];
    saveTickets();
    renderTickets();
}

function deleteTicket(index) {
    tickets.splice(index, 1);
    saveTickets();
    renderTickets();
}

