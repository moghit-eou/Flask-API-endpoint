# Flask-API-endpoint

---

## Getting Started

### Prerequisites

- Python 3.8+
- [uv](https://github.com/astral-sh/uv) (a fast Python package installer, alternative to pip)

### Installing Dependencies

Instead of `pip`, this project uses [uv](https://github.com/astral-sh/uv) for dependency management.  
`uv` is a super-fast Python package installer and resolver, designed as a drop-in replacement for pip.


install uv 
```bash
pip install uv
```
create a virtual environment using uv,
```bash
uv venv .venv
```

How to activate the virtual environment:

- On Windows:
  ```bash
  .venv\Scripts\activate
  ```
- On macOS/Linux:
  ```bash
  source .venv/bin/activate
  ```

Then, install the project requirements:

```bash
uv pip install -r requirements.txt
```

---

## Running the Application

To start the Flask API server, run:

```bash
python app.py
```

By default, the app will be available at `http://127.0.0.1:5000/`.

---


## Notes

- This project is intended to be integrated into larger automation workflows.
- You can customize or extend the endpoints in `app.py` as needed for your use case.

---

## License

MIT License

---

## Author
@moghit-eou