let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
let editIndex = -1;

const form = document.getElementById("jobForm");
const jobsList = document.getElementById("jobsList");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const job = {
        company: document.getElementById("company").value,
        role: document.getElementById("role").value,
        date: document.getElementById("date").value,
        status: document.getElementById("status").value,
        notes: document.getElementById("notes").value
    };

    if (editIndex === -1) {
        jobs.push(job);
    } else {
        jobs[editIndex] = job;
        editIndex = -1;
        form.querySelector("button[type='submit']").textContent = "Add Job";
    }

    localStorage.setItem("jobs", JSON.stringify(jobs));
    form.reset();
    renderJobs();
});

function renderJobs() {
    jobsList.innerHTML = "";
    jobs.forEach((job, index) => {
        const div = document.createElement("div");
        div.className = "job-card";
        div.innerHTML = `
      <strong>${job.company}</strong> — ${job.role}<br />
      <em>${job.date}</em><br />
      <span>Status: ${job.status}</span><br />
      <small>${job.notes}</small>
      <div class="actions">
        <button onclick="editJob(${index})">✏️</button>
        <button onclick="deleteJob(${index})">❌</button>
      </div>
    `;
        jobsList.appendChild(div);
    });
}

function editJob(index) {
    const job = jobs[index];
    document.getElementById("company").value = job.company;
    document.getElementById("role").value = job.role;
    document.getElementById("date").value = job.date;
    document.getElementById("status").value = job.status;
    document.getElementById("notes").value = job.notes;
    editIndex = index;
    form.querySelector("button[type='submit']").textContent = "Update Job";
}

function deleteJob(index) {
    jobs.splice(index, 1);
    localStorage.setItem("jobs", JSON.stringify(jobs));
    renderJobs();
}

function exportToCSV() {
    let csv = "Company,Role,Date,Status,Notes\n";
    jobs.forEach(job => {
        csv += `"${job.company}","${job.role}","${job.date}","${job.status}","${job.notes}"\n`;
    });

    const blob = new Blob([csv], {
        type: "text/csv"
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "job_applications.csv";
    a.click();
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Initial render
renderJobs();
