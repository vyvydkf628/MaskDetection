# MaskDetection
[![Run on Ainize](https://www.ainize.ai/static/images/run_on_ainize_button.svg)](https://ainize.web.app/redirect?git_repo=github.com/vyvydkf628/MaskDetection)

This repository provides an API server that detects whether the person in the image is wearing a mask or not. The model used in the server is from [face-api](https://github.com/justadudewhohacks/face-api.js/) and [teachable machine](https://github.com/googlecreativelab/teachable-machine-v1)

# How to deploy
MaskDetection API is dockerized, so it can be built and run using docker commands.

## Docker build
``` docker build -t {image name} .```

## Docker run
``` docker run -t {image name} .```

Now the server is available at http://localhostL80. To learn how to query the server, see the next section.

Note that the docker image can be deployed using any docker-based deploy platform (e.g. ainize.ai).

# References

* https://github.com/justadudewhohacks/face-api.js/
* https://github.com/googlecreativelab/teachable-machine-v1
* https://github.com/X-zhangyang/Real-World-Masked-Face-Dataset

# License
MIT License


