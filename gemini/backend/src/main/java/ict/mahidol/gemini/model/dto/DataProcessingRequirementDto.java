package ict.mahidol.gemini.model.dto;

public class DataProcessingRequirementDto {
    protected int dataProcessReqId;
    protected String fileType;
    protected String fileQuality;
    protected String colorType;
    protected double contrast;
    protected double brightness;
    protected double saturation;
    protected double highlight;
    protected double exposure;
    protected double shadows;
    protected double whites;
    protected double blacks;
    protected double luminance;
    protected double hue;

    public DataProcessingRequirementDto()
    {
        super();
    }

    public DataProcessingRequirementDto(String fileType, String fileQuality, String colorType,
                                     double contrast, double brightness, double saturation,
                                     double highlight, double exposure, double shadows,
                                     double whites, double blacks, double luminance, double hue) {
        this.fileType = fileType;
        this.fileQuality = fileQuality;
        this.colorType = colorType;
        this.contrast = contrast;
        this.brightness = brightness;
        this.saturation = saturation;
        this.highlight = highlight;
        this.exposure = exposure;
        this.shadows = shadows;
        this.whites = whites;
        this.blacks = blacks;
        this.luminance = luminance;
        this.hue = hue;
    }

    public String getFileType() {
        return fileType;
    }

    public String getFileQuality() {
        return fileQuality;
    }

    public String getColorType() {
        return colorType;
    }

    public double getContrast() {
        return contrast;
    }

    public double getBrightness() {
        return brightness;
    }

    public double getSaturation() {
        return saturation;
    }

    public double getHighlight() {
        return highlight;
    }

    public double getExposure() {
        return exposure;
    }

    public double getShadows() {
        return shadows;
    }

    public double getWhites() {
        return whites;
    }

    public double getBlacks() {
        return blacks;
    }

    public double getLuminance() {
        return luminance;
    }

    public double getHue() {
        return hue;
    }
}
