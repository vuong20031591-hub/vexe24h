import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Gửi thành công!",
        description: "Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      className="bg-gray-50 py-12 sm:py-16"
      id="contact"
      data-testid="section-contact"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Liên hệ với chúng tôi
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600">
            Hãy để lại thông tin, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất
          </p>
        </div>

        <div className="grid gap-0 lg:grid-cols-2">
          {/* Contact Form */}
          <Card className="z-10 p-6 lg:p-8 lg:shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm">
                  Họ và tên <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-10"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-10"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-sm">
                  Số điện thoại <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="0901234567"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="h-10"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-sm">
                  Nội dung <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Nhập nội dung cần liên hệ..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="resize-none"
                />
              </div>

              <Button
                type="submit"
                className="h-11 w-full bg-futa-red text-white hover:bg-futa-red/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Đang gửi..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Gửi liên hệ
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Contact Image */}
          <div className="flex min-h-[500px] items-center overflow-hidden rounded-lg lg:-ml-6 lg:min-h-0 lg:rounded-l-none">
            <img
              src="/generated_images/contact.png"
              alt="Liên hệ với chúng tôi"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
