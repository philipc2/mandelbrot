# Mandelbrot 

Visualuzation of the Mandelbrot Set using Node-JS and Python


<!-- or relative to container -->
<img src="static/seahorse_valley.jpg" alt="Valley" style="width:60%;"/>

## Overview

A cross-language project that uses Node-JS to generate data from the Mandelbrot Set and Python to visualize the result using Matplotlib. Both
packages are self-contained within command line scripts. 



## Usage 

### Prerequisites

- **Node.js** & npm  
- **Python 3.8++**, pip  
- (Optionally) **Conda** to manage your Python env 


### 1. Build or install the CLIs

```shell
# JS CLI
cd js-mandelbrot
npm install    # installs dependencies

# Python CLI
cd path/to/python-package
pip install -e .   # registers `mandelbrot-vis`
```

### 2. Generate a JSON View

```shell
node js-mandelbrot/bin/mandelbrot.js \
  -x -0.7435669 -y 0.1314023 \
  -w 0.0022878  -h 0.0022878 \
  -s 1e-5 \
  -n 2000 \
> seahorse_tail.json
```

### 3. Render Image

```shell
mandelbrot-vis seahorse_tail.json seahorse_tail.png
```

### 4. Preconfigured Scrip

```shell
chmod +x generate_mandelbrot.sh
conda activate mandelbrot
./generate_mandelbrot.sh
```

