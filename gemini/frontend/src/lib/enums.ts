export enum PlanStatus {
  SAVED = "SAVED",
  TESTED = "TESTED",
  SUBMITTED = "SUBMITTED",
  VALIDATED = "VALIDATED",
  RUNNING = "RUNNING",
  INVALIDATE = "INVALIDATE",
  COMPLETE = "COMPLETE",
  CANCELLED = "CANCELLED",
}

export enum FileType {
  PNG = "PNG",
  JPEG = "JPEG",
  RAW = "RAW",
}

export enum FileQuality {
  LOW = "Low",
  FINE = "Fine",
}

export enum ColorType {
  COLOR = "Color mode",
  BW = "B&W mode",
}

export enum Role {
  ASTRONOMER = "astronomer",
  SCIENCE_OBSERVER = "scienceObserver",
}
