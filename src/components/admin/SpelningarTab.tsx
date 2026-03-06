import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Wrench } from "lucide-react";
import ScheduleTab from "./ScheduleTab";
import EquipmentTab from "./EquipmentTab";

const SpelningarTab = () => {
  return (
    <Tabs defaultValue="calendar">
      <TabsList className="grid w-full grid-cols-2 mb-6 glass-card">
        <TabsTrigger value="calendar" className="data-[state=active]:bg-primary/20">
          <Calendar className="w-4 h-4 mr-2" />Kalender
        </TabsTrigger>
        <TabsTrigger value="equipment" className="data-[state=active]:bg-primary/20">
          <Wrench className="w-4 h-4 mr-2" />Utrustning
        </TabsTrigger>
      </TabsList>
      <TabsContent value="calendar"><ScheduleTab /></TabsContent>
      <TabsContent value="equipment"><EquipmentTab /></TabsContent>
    </Tabs>
  );
};

export default SpelningarTab;
