import React from 'react';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
    import { motion } from 'framer-motion';
    import { Gift, Smartphone, DollarSign, ShieldCheck } from 'lucide-react';
    import { useToast } from "@/components/ui/use-toast";
    import { Button } from "@/components/ui/button";

    const supportDetails = [
      {
        icon: <Smartphone size={28} className="text-orange-500" />,
        title: "MTN Mobile Money",
        value: "0557488116",
        description: "Support via MTN MoMo (Ghana).",
        type: "momo"
      },
      {
        icon: <Smartphone size={28} className="text-red-500" />,
        title: "Telecel Cash",
        value: "COMING SOON",
        description: "Telecel (Vodafone Cash) option will be available shortly.",
        type: "telecel"
      },
      {
        icon: <DollarSign size={28} className="text-yellow-400" />,
        title: "Binance Pay ID",
        value: "959055327",
        description: "Support using Binance Pay (User ID).",
        type: "binance"
      }
    ];

    const SupportCard = ({ icon, title, value, description, type }) => {
      const { toast } = useToast();

      const handleCopy = (textToCopy, platform) => {
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            toast({
              title: "Copied to Clipboard!",
              description: `${platform} details: ${textToCopy}`,
            });
          })
          .catch(err => {
            toast({
              variant: "destructive",
              title: "Copy Failed",
              description: "Could not copy to clipboard. Please try manually.",
            });
            console.error('Failed to copy: ', err);
          });
      };

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -5, boxShadow: "0 10px 20px hsla(var(--foreground)/0.05)" }}
          className="w-full"
        >
          <Card className="h-full glassmorphism flex flex-col p-6 text-center items-center">
            <div className="p-4 bg-primary/10 rounded-full mb-4 inline-block">
              {icon}
            </div>
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-2xl font-display">{title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-grow flex flex-col items-center justify-center">
              <p className="text-3xl font-mono font-bold text-primary my-3 tracking-wider">
                {value}
              </p>
              <CardDescription className="text-muted-foreground mb-4">{description}</CardDescription>
              {value !== "COMING SOON" && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCopy(value, title)}
                  className="border-primary/50 text-primary hover:bg-primary/10 hover:text-accent"
                >
                  Copy {type === "momo" || type === "telecel" ? "Number" : "ID"}
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    const SupportPage = () => {
      return (
        <div className="py-12">
          <motion.section
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <div className="inline-block p-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full mb-6 shadow-lg">
              <Gift size={48} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tighter mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                Support Our Work
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Your generous support helps us continue creating, innovating, and sharing projects with the world. Every contribution, big or small, is deeply appreciated.
            </p>
          </motion.section>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {supportDetails.map((detail) => (
              <SupportCard key={detail.title} {...detail} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-center mt-16 p-8 glassmorphism rounded-lg"
          >
            <ShieldCheck size={40} className="mx-auto mb-4 text-green-500" />
            <h2 className="text-3xl font-display font-semibold mb-3 text-primary">
              Thank You!
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Your support means a lot and directly contributes to the development of new features, content, and the overall maintenance of this platform. We are incredibly grateful for your encouragement!
            </p>
          </motion.div>
        </div>
      );
    };

    export default SupportPage;
