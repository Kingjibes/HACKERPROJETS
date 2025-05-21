import React from 'react';
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
    import { motion } from 'framer-motion';
    import { Send, MessageCircle, Phone, Users } from 'lucide-react'; // Users for channels

    const contactDetails = {
      whatsappNumberLink: "https://wa.me/+233557488116",
      telegramContactLink: "https://t.me/HACK_ERPRO",
      whatsappChannelLink: "https://whatsapp.com/channel/0029Vb3wqli8V0tfOrWXwk2K",
      telegramChannelLink: "https://t.me/ciphertech2",
      email: "contact@hackerpro.dev", // Example email
    };

    const ContactCard = ({ icon, title, description, link, buttonText }) => (
      <motion.div
        whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
        className="w-full"
      >
        <Card className="h-full glassmorphism flex flex-col">
          <CardHeader className="items-center text-center">
            <div className="p-3 bg-primary/10 rounded-full mb-3 text-primary">
              {icon}
            </div>
            <CardTitle className="text-xl font-display">{title}</CardTitle>
            <CardDescription className="text-muted-foreground">{description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-center justify-center">
            <Button asChild className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity">
              <a href={link} target="_blank" rel="noopener noreferrer">
                {buttonText} <Send className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );

    const ContactPage = () => {
      return (
        <div className="py-12">
          <motion.section
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tighter mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent">
                Let's Connect
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Reach out for collaborations, inquiries, or just to say hi! I'm always open to new ideas and discussions.
            </p>
          </motion.section>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <ContactCard
              icon={<Phone size={28} />}
              title="WhatsApp Contact"
              description="Direct message for quick chats."
              link={contactDetails.whatsappNumberLink}
              buttonText="Chat on WhatsApp"
            />
            <ContactCard
              icon={<MessageCircle size={28} />}
              title="Telegram Contact"
              description="Connect with me on Telegram."
              link={contactDetails.telegramContactLink}
              buttonText="Message on Telegram"
            />
             <ContactCard
              icon={<Users size={28} />}
              title="WhatsApp Channel"
              description="Join for updates and announcements."
              link={contactDetails.whatsappChannelLink}
              buttonText="Join WhatsApp Channel"
            />
            <ContactCard
              icon={<Users size={28} />}
              title="Telegram Channel"
              description="Follow for tech insights and news."
              link={contactDetails.telegramChannelLink}
              buttonText="Join Telegram Channel"
            />
            <ContactCard
              icon={<Send size={28} />}
              title="Email"
              description="For formal inquiries or detailed discussions."
              link={`mailto:${contactDetails.email}`}
              buttonText="Send an Email"
            />
          </motion.div>
        </div>
      );
    };

    export default ContactPage;