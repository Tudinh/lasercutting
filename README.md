# Physical Computing &amp; Prototyping: Lasercutting
The following templates and script are designed to help get you started with preparing your files for lasercutting. There is 1 template for usage witin the [Institute of Making (IoM)](https://www.instituteofmaking.org.uk/) and one which is intended for the students on the Physical Computing &amp; Prototyping (PCP) module at the UCL Interaction Centre (UCLIC) on the MSc Human-Computer Interaction course for a class activity based upon the IoM template with a few differences noted below.

In addition we've included a script which can help with the [pre-flight](https://en.wikipedia.org/wiki/Pre-flight_(printing)) process. For those from a computer science background, you can imagine it as a [linter](https://en.wikipedia.org/wiki/Lint_(software)). In other words, the goal of the script is to help hightlight possible issues and reduce human error in the process so that your laser cutting can go as smoothly as possible.

To students on the PCP module, please ensure your pre-flight status has passed without a warning or failure before uploading your file onto Moodle.

## Institute of Making Template
Template: `templates/IoM-LaserCuttingTemplate.ai`

This template has been setup so that default Swatches and Graphic Styles have been defined for the purpose of laser cutting at the IoM. The default style when drawing an object sets the stroke to be `0.001mm`. In other words as soon as you start drawing an object, the stroke should be set to `0.001mm` by Illustrator.

![Stroke](/images/ScreenCapture-Stroke_v01.png)

To make sure you are using the [correct colours](https://www.instituteofmaking.org.uk/assets/_files/uploads/laser_guide3.pdf) for the laser cutting, we have predefined Swatches such as: Engrave (Black), Score (Blue), Cut (Red). We recommend you use the swatches in the templates rather than defining your own manaully as seen in the below:

![Swatches](/images/ScreenCapture-Swatches_v01.gif)

## PCP Template
Template: `templates/PCP-LaserCuttingTemplate.ai`

This is the template you should use for the class lasercutting activity for PCP. The difference between this template and the IoM template are as follows:

- It is 150mm by 100mm, compared to the 610mm by 457mm for the laser cutter at the IoM.
- We are only including the `Cut` (red) swatch within this template, this should only be used, not `Engrave` or `Score`.

Please use this template for the class activity and not the IoM template, however when you are undertaking your projects outside of class, please use the general template.

## Pre-flight Script
This script has been prepared to help sense check your document before you lasercut. To run the script, you need to do the following:

Head to: `/Applications/Adobe Illustrator CC 2019/Presets/en_GB/Scripts`.

![Location of Script Path](/images/ScriptPath_v01.png)

Place the script found in `scripts\preflight.jsx`, in the folder above.

You'll then be able to run the script on your opened document, by going to:

[Screen Shot 2019-02-04 at 15.03.18]

The script will then run through various checks such as checking if:

- the document is set to RGB
- the stroke widths for paths are 0.001mm
- the stroke colour are either cut, engrave, score and using the swatches that are defined in the template

Here are things that we don't currently check for but we may improve the script to do in the future (but would suggest you check manually at least):

- The page size is correct
- There should not be no bitmap images in the document
- Fonts should be set to an outline
- There should not be overlapping paths

Please check the warnings and correct before trying to lasercut. If you get a `failed` or `warning` status with the script, we recommend that you should try to fix these issues and aim for your file to `pass` before trying to use the laser cutter.

Here is an example of what you can expect if a file has passed:

Here is an example if a file fails:

## Useful Links
- [10 Tips and Tricks for Laser Engraving and Cutting](https://www.instructables.com/id/10-Tips-and-Tricks-for-Laser-Engraving-and-Cutting/)
- [IoM Laser Cutter](https://www.instituteofmaking.org.uk/makespace/tools/laser-cutters/universal-vls4.60)
- [Illustrator Scripting](https://www.adobe.com/devnet/illustrator/scripting.html)