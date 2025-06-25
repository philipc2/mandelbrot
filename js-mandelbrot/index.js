async function generate({
                            centerX,
                            centerY,
                            width,
                            height,
                            step,
                            maxIterations,
                            bound,
                            power
                        }) {
    const nx = Math.ceil(width / step);
    const ny = Math.ceil(height / step);
    const results = [];

    for (let j = 0; j < ny; j++) {
        const y0 = centerY - height / 2 + j * step;
        for (let i = 0; i < nx; i++) {
            const x0 = centerX - width / 2 + i * step;
            let x = 0, y = 0, iter = 0;

            while (x * x + y * y < bound * bound && iter < maxIterations) {
                // TODO: Add non-quadratic power support
                const xt = x * x - y * y + x0;
                const yt = 2 * x * y + y0;

                x = xt;
                y = yt;
                iter++;
            }

            results.push({i, j, iter});
        }
    }

    return {nx, ny, maxIterations, data: results};
}

module.exports = generate;
