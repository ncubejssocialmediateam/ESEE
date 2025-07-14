import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface PublicationCardProps {
  title: string;
  description: string;
  category: string;
  date: string;
  imageUrl: string;
  downloadUrl?: string;
}

export function PublicationCard({
  title,
  description,
  category,
  date,
  imageUrl,
  downloadUrl
}: PublicationCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 overflow-hidden">
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-white/90 text-slate-700 text-xs uppercase tracking-wide">
            {category}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="font-semibold text-lg mb-3 line-clamp-2 leading-tight">
          {title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{date}</span>
          {downloadUrl && (
            <Button variant="outline" size="sm" className="text-sm">
              <Download className="w-3 h-3 mr-1" />
              Download PDF
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
