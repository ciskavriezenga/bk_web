# Simple python flask server example

## Requirements
Python and Flask


## Folder structure

Flask looks for HTML files in a folder called templates/ by default, and static files (JS/CSS/images) in static/.
Thus, index.html is placed in templates, css and js in static.


## Install and run LOCAL

Install Flask
```bash
pip install Flask
```

On Mac? And used homebrew to install Python?
Option 1 - Use a virtual environment
- Start virtual environment
```bash
python3 -m venv venv
```

- Activate the virtual environment
```bash
source venv/bin/activate
```

- Install Flask in virtual environment
```bash
pip install Flask
```

- Install Flask cors in virtual environment
```bash
pip install flask_cors
```

- Run the python Flask server in the virtual environment
```bash
python app.py
```

- To deactivate the environment, simply type
```bash
deactivate
```

- To reactivate the flask virtual environment, you can simply retype the following, no need to reinstall flask
- Activate the virtual environment
```bash
source venv/bin/activate
```

## Install and run ON THE NAS

Info - On the NAS
- pip is installed and can be run from terminal with ssh connection
- Flask is already installed.

```bash
python backend/app.py
```

Want to empty stored data? Run following line
```bash
cp backend/data_zero_placeholder.json backend/data.json
```
