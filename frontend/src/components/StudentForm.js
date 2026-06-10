function StudentForm({
  student,
  onChange,
  onSubmit,
  submitLabel,
  loading = false,
}) {
  const updateField = (field, value) => {
    onChange({
      ...student,
      [field]: value,
    });
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="mb-3">
        <label className="form-label" htmlFor="studentName">
          Name
        </label>
        <input
          id="studentName"
          type="text"
          className="form-control"
          value={student.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="Enter student name"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="studentEmail">
          Email
        </label>
        <input
          id="studentEmail"
          type="email"
          className="form-control"
          value={student.email}
          onChange={(e) => updateField("email", e.target.value)}
          placeholder="Enter email address"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="studentPhone">
          Phone
        </label>
        <input
          id="studentPhone"
          type="tel"
          className="form-control"
          value={student.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          placeholder="Enter phone number"
          required
        />
      </div>

      <div className="mb-4">
        <label className="form-label" htmlFor="studentCourse">
          Course
        </label>
        <input
          id="studentCourse"
          type="text"
          className="form-control"
          value={student.course}
          onChange={(e) => updateField("course", e.target.value)}
          placeholder="Enter course"
          required
        />
      </div>

      <button className="btn btn-primary w-100" type="submit" disabled={loading}>
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default StudentForm;
