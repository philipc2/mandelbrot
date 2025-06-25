import json

import click
import matplotlib.pyplot as plt
import numpy as np
from matplotlib import cm
from matplotlib.colors import PowerNorm


@click.command()
@click.argument('input_file', type=click.Path(exists=True))
@click.argument('output_file', type=click.Path(), default='mandelbrot.png')
def main(input_file, output_file):
    # Load the JSON output from Node-JS package
    with open(input_file, 'r') as f:
        obj = json.load(f)

    nx = obj['nx']
    ny = obj['ny']
    raw = obj['data']

    # Reconstruct 2D array
    iters = np.zeros((ny, nx), dtype=int)
    for pix in raw:
        i, j, count = pix['i'], pix['j'], pix['iter']
        iters[j, i] = count

    max_iter = obj.get('maxIterations', None)
    if max_iter is None:
        max_iter = max(p['iter'] for p in raw)

    # Mask pixels that never diverged
    masked = (iters == max_iter)
    iters = np.ma.array(iters, mask=masked)

    # Colormap
    cmap = cm.get_cmap('inferno').copy()
    cmap.set_bad('black')
    norm = PowerNorm(gamma=0.3, vmin=0, vmax=max_iter)

    fig, ax = plt.subplots(figsize=(6, 6))
    ax.axis('off')

    im = ax.imshow(iters, origin='lower',
                   cmap=cmap, norm=norm)

    plt.savefig(output_file, dpi=300, bbox_inches='tight')
    plt.close(fig)git


if __name__ == '__main__':
    main()
