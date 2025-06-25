const {program} = require('commander');
const generate = require('../index');

program
    .option(
        '-x, --center-x <number>',
        'x-coordinate of center',
        v => parseFloat(v),
        0
    )
    .option(
        '-y, --center-y <number>',
        'y-coordinate of center',
        v => parseFloat(v),
        0
    )
    .option(
        '-w, --width <number>',
        'view width',
        v => parseFloat(v),
        4
    )
    .option(
        '-h, --height <number>',
        'view height',
        v => parseFloat(v),
        4
    )
    .option(
        '-s, --step <number>',
        'pixel resolution',
        v => parseFloat(v),
        0.01
    )
    .option(
        '-n, --max-iterations <number>',
        'maximum iterations',
        v => parseInt(v, 10),
        100
    )
    .option(
        '-b, --bound <number>',
        'divergence cutoff',
        v => parseFloat(v),
        2
    )
    .option(
        '-p, --power <number>',
        'exponent',
        v => parseFloat(v),
        2
    )
    .parse(process.argv);

const options = program.opts();

generate(options)
    .then(data => {
        process.stdout.write(JSON.stringify(data));
    })
    .catch(err => {
        console.error('Error generating Mandelbrot data:', err);
        process.exit(1);
    });
