import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { DialogContent, DialogHeader } from "../ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Switch } from "@radix-ui/react-switch";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CreateSciencePlanForm() {
  // TODO
  const [mode, setMode] = useState("color");
  return (
    <main>
      <div className="grid w-full items-center gap-3">
        <Label htmlFor="email">Plan Name</Label>
        <Input type="text" id="email" placeholder="Plan Name" />

        <Label htmlFor="email">Objective</Label>
        <Input type="text" id="email" placeholder="Objective" />

        <span className="">
          <Label htmlFor="email">Funding</Label>
          <Input type="number" step="0.01" id="email" placeholder="Funding" />
        </span>

        <div className="flex gap-5">
          <div>
            <Label htmlFor="email">StartDate</Label>
            <Input type="date" id="email" placeholder="Objective" />
          </div>
          <div>
            <Label htmlFor="email">EndDate</Label>
            <Input type="date" id="email" placeholder="Objective" />
          </div>
          <div>
            <Label htmlFor="black&whiteorcolor">Picture Color</Label>
            <RadioGroup
              defaultValue="color"
              value={mode}
              onValueChange={setMode}
              id="black&whiteorcolor"
            >
              <div className="flex items-center space-x-2 mt-1.5">
                <RadioGroupItem value="color" id="color" />
                <Label htmlFor="color">Color</Label>
                <RadioGroupItem value="blackandwhite" id="blackandwhite" />
                <Label htmlFor="blackandwhite">Black&White</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="flex gap-5">
          <div>
            <Label htmlFor="fileType">File Type</Label>
            <Select>
              <SelectTrigger className="w-[180px]" id="fileType">
                <SelectValue placeholder="File Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PNG">PNG</SelectItem>
                <SelectItem value="JPEG">JPEG</SelectItem>
                <SelectItem value="RAW">RAW</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="fileQuality">File Quality</Label>
            <Select>
              <SelectTrigger className="w-[180px]" id="fileQuality">
                <SelectValue placeholder="File Quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">LOW</SelectItem>
                <SelectItem value="FINE">FINE</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="contrast">Contrast</Label>
            <Input
              type="number"
              step="0.01"
              id="contrast"
              placeholder="Contrast"
            />
          </div>
        </div>
        {mode === "color" ? (
          <CreateSciencePlanDataProcessingColor />
        ) : (
          <CreateSciencePlanDataProcessingBlackWhite />
        )}
        <Button variant="outline">Submit</Button>
      </div>
    </main>
  );
}

export function CreateSciencePlanDataProcessingBlackWhite() {
  return (
    <main>
      <div className="flex gap-4">
        <div>
          <Label htmlFor="exposure">Exposure</Label>
          <Input
            type="number"
            step="0.01"
            id="exposure"
            placeholder="Exposure"
          />
        </div>
        <div>
          <Label htmlFor="highlight">Highlight</Label>
          <Input
            type="number"
            step="0.01"
            id="highlight"
            placeholder="Highlight"
          />
        </div>
        <div>
          <Label htmlFor="saturation">Shadow</Label>
          <Input type="shadow" step="0.01" id="shadow" placeholder="Shadow" />
        </div>
      </div>
      <div className="flex gap-4 mt-2.5">
        <div>
          <Label htmlFor="luminance">White</Label>
          <Input type="number" step="0.01" id="white" placeholder="White" />
        </div>
        <div>
          <Label htmlFor="black">Black</Label>
          <Input type="number" step="0.01" id="black" placeholder="Black" />
        </div>
        <Label className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-black to-white cursor-default select-none">
          Black&White Mode
        </Label>
      </div>
    </main>
  );
}

export function CreateSciencePlanDataProcessingColor() {
  return (
    <main>
      <div className="flex gap-4">
        <div>
          <Label htmlFor="exposure">Exposure</Label>
          <Input
            type="number"
            step="0.01"
            id="exposure"
            placeholder="Exposure"
          />
        </div>
        <div>
          <Label htmlFor="brightness">Brightness</Label>
          <Input
            type="number"
            step="0.01"
            id="contrast"
            placeholder="Brightness"
          />
        </div>
        <div>
          <Label htmlFor="saturation">Saturation</Label>
          <Input
            type="number"
            step="0.01"
            id="saturaion"
            placeholder="Saturation"
          />
        </div>
      </div>
      <div className="flex gap-4 mt-2.5">
        <div>
          <Label htmlFor="luminance">Luminance</Label>
          <Input
            type="number"
            step="0.01"
            id="luminance"
            placeholder="Luminance"
          />
        </div>
        <div>
          <Label htmlFor="hue">Hue</Label>
          <Input type="number" step="0.01" id="hue" placeholder="hue" />
        </div>
        <Label className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white cursor-default select-none bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-600">
          Color Mode
        </Label>
      </div>
    </main>
  );
}
