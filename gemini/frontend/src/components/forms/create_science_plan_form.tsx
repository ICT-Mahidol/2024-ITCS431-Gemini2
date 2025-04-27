import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose, // Import DialogClose
} from "@/components/ui/dialog"; // Assuming Dialog is from ui
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"; // Use Form components from ui
import { useForm } from "react-hook-form";
import { createSciencePlanSchema } from "./schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColorType, FileQuality, FileType } from "@/lib/enums";
import { createSciencePlan } from "@/api/create_science_plan";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function CreateSciencePlanForm() {
  const mutation = useMutation({
    mutationFn: createSciencePlan,
    onSuccess: () => {
      toast.success("Science plan created successfully!");
    },
    onError: (error) => {
      toast.error(`Error creating science plan. ${error}`);
    },
  }); // Setup mutation if needed

  const form = useForm<z.infer<typeof createSciencePlanSchema>>({
    resolver: zodResolver(createSciencePlanSchema),
    defaultValues: {
      planName: "",
      funding: 0,
      starSystem: "",
      objective: "",
      startDate: "", // Default empty string for date inputs
      endDate: "",
      telescopeLocation: "",
      dataProcessingReq: {
        fileType: FileType.JPEG,
        fileQuality: FileQuality.FINE,
        colorType: ColorType.COLOR,
        contrast: 0,
        exposure: 0,
        brightness: 0,
        saturation: 0,
        luminance: 0,
        hue: 0,
        highlight: 0,
        shadows: 0,
        whites: 0,
        blacks: 0,
      },
    },
  });

  // Watch the colorType field to conditionally render sections
  const watchedColorType = form.watch("dataProcessingReq.colorType");

  // This function will be called ONLY after successful validation
  // function onSubmit(values: z.infer<typeof createSciencePlanSchema>) {
  //   console.log("Form Submitted (Validated):", values);
  //   // mutation.mutate(values); // Trigger your API call here
  //   // NOTE: The dialog confirmation logic needs adjustment (see below)
  // }

  // Handle the actual submission *after* confirmation in the dialog
  const handleConfirmSubmit = () => {
    const currentValues = form.getValues(); // Get current form values
    // console.log("Confirmed Submit:", currentValues);
    mutation.mutate(currentValues); // Call mutation with current values
    form.reset();
  };

  return (
    // Form Provider provides context to FormField etc.
    <Form {...form}>
      {/* form.handleSubmit wraps your onSubmit and performs validation */}
      {/* We will trigger submission from the Dialog's confirm button */}
      <form onSubmit={(e) => e.preventDefault} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="planName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plan Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Plan Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telescopeLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telescope Location</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="funding"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Funding</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Enter Funding Amount"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="starSystem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Star System</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="objective"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Objective</FormLabel>
              <FormControl>
                <Input placeholder="Enter Objective" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --- Data Processing Section --- */}
        <h3 className="text-lg font-medium border-t pt-4 mt-4">
          Data Processing Requirements
        </h3>
        <FormField
          control={form.control}
          name="dataProcessingReq.colorType"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Picture Color Mode</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex items-center space-x-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value={ColorType.COLOR} id="color" />
                    </FormControl>
                    <FormLabel htmlFor="color" className="font-normal">
                      Color
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value={ColorType.BW} id="bw" />
                    </FormControl>
                    <FormLabel htmlFor="bw" className="font-normal">
                      Black & White
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="dataProcessingReq.fileType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select File Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(FileType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dataProcessingReq.fileQuality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File Quality</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select File Quality" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(FileQuality).map((quality) => (
                      <SelectItem key={quality} value={quality}>
                        {quality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dataProcessingReq.contrast"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contrast</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Contrast"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Conditionally Rendered Fields */}
        {watchedColorType === ColorType.COLOR ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="dataProcessingReq.exposure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exposure</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Exposure"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dataProcessingReq.brightness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brightness</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Brightness"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dataProcessingReq.saturation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Saturation</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Saturation"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="dataProcessingReq.luminance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Luminance</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Luminance"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dataProcessingReq.hue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hue</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Hue"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white cursor-default select-none bg-gradient-to-r from-red-500 via-yellow-500 to-purple-600">
                Color Mode Active
              </div>
            </div>
          </div>
        ) : (
          // Black & White Fields
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="dataProcessingReq.exposure" // Still relevant? Include if yes
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exposure</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Exposure"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dataProcessingReq.highlight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Highlight</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Highlight"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dataProcessingReq.shadows"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shadows</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Shadows"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="dataProcessingReq.whites"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Whites</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Whites"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dataProcessingReq.blacks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blacks</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Blacks"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-black to-white cursor-default select-none">
                Black & White Mode Active
              </div>
            </div>
          </div>
        )}
        {/* --- Submission Dialog --- */}
        {/* The trigger button is now just a regular button visually */}
        {/* The actual submission logic is handled by handleConfirmSubmit */}
        <Dialog>
          <DialogTrigger asChild>
            {/* This button triggers the dialog but NOT the form submission itself */}
            <Button variant="outline" className="w-full mt-6">
              Create Science Plan
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to create this science plan?
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Please review the details before confirming. This action will
                create a new science plan with status CREATED.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <DialogClose asChild>
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </DialogClose>
              {/* This button calls the CONFIRMED submit handler */}
              <Button
                variant="default" // Or destructive if preferred
                className="w-full"
                onClick={form.handleSubmit(handleConfirmSubmit)} // Validate AGAIN before confirm submit
              >
                {mutation.isPending ? "Submitting..." : "Confirm Submit"}
                Confirm Submit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}

// Remove the separate CreateSciencePlanDataProcessing... components
// as their fields are now integrated directly above.
// Keep confirmCreateSciencePlan logic integrated as the Dialog part.
