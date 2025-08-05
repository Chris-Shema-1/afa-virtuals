    class VolkovChat {
            constructor() {
                this.session = {
                    askedKeywords: [],
                    popupSeen: false,
                    chatStarted: false
                };
                
                this.faqMap = [
                    {
                        keywords: ['automation', 'automate', 'workflows', 'zapier', 'tools'],
                        answer: "We build custom automation workflows using Zapier, Airtable, and other tools to handle your lead capture, email campaigns, CRM updates, and client onboarding automatically.",
                        priority: 10
                    },
                    {
                        keywords: ['pricing', 'cost', 'price', 'how much', 'expensive'],
                        answer: "Most clients invest $1,500–$5,000 for setup, then $800–$2,500/month for dedicated VA support and ongoing automation maintenance. Custom quotes available!",
                        priority: 9
                    },
                    {
                        keywords: ['virtual assistant', 'va', 'assistant', 'support'],
                        answer: "You get a dedicated, trained VA who manages your daily admin, CRM updates, email responses, social scheduling, and system monitoring—fully customizable to your needs.",
                        priority: 8
                    },
                    {
                        keywords: ['website', 'web design', 'site', 'wordpress'],
                        answer: "Yes! We design modern, responsive websites using WordPress, Webflow, or custom builds that integrate seamlessly with your automation stack and CRM systems.",
                        priority: 7
                    },
                    {
                        keywords: ['social media', 'social', 'posting', 'facebook', 'instagram'],
                        answer: "We automate social media posting using Buffer, Meta Business Suite, and scheduling tools, plus your VA can manage content creation and engagement.",
                        priority: 6
                    },
                    {
                        keywords: ['branding', 'brand', 'logo', 'design', 'graphics'],
                        answer: "We create complete brand packages including logos, style guides, social graphics, and marketing materials—all integrated with your website and automation systems.",
                        priority: 6
                    },
                    {
                        keywords: ['leads', 'lead capture', 'crm', 'follow up'],
                        answer: "We automate lead capture from all sources (ads, forms, social) directly into your CRM with proper tagging, notifications, and automated follow-up sequences.",
                        priority: 8
                    },
                    {
                        keywords: ['onboarding', 'setup', 'implementation', 'how long'],
                        answer: "Implementation typically takes 7–14 business days including discovery, automation design, system walkthrough, VA matching, and first task handover.",
                        priority: 5
                    },
                    {
                        keywords: ['industry', 'fit', 'business type', 'coaching', 'consulting'],
                        answer: "Perfect for coaches, consultants, real estate pros, service-based businesses, and online entrepreneurs who want to scale without building in-house teams.",
                        priority: 4
                    },
                    {
                        keywords: ['time zone', 'hours', 'availability', 'response time'],
                        answer: "Our VAs work across global time zones with 4-hour overlap guaranteed. Standard response time is 3 business hours, with premium same-day options available.",
                        priority: 3
                    }
                ];

                this.init();
            }

            init() {
                // Show popup after 10 seconds if not seen
                setTimeout(() => {
                    if (!this.session.popupSeen && !this.session.chatStarted) {
                        this.showPopup();
                    }
                }, 10000);
            }

            showPopup() {
                const popup = document.getElementById('initialPopup');
                popup.classList.add('show');
                this.session.popupSeen = true;
            }

            hidePopup() {
                const popup = document.getElementById('initialPopup');
                popup.classList.remove('show');
            }

            findBestMatch(message) {
                const messageLower = message.toLowerCase();
                let bestMatch = null;
                let highestPriority = 0;

                for (const faq of this.faqMap) {
                    for (const keyword of faq.keywords) {
                        if (messageLower.includes(keyword.toLowerCase())) {
                            if (faq.priority > highestPriority) {
                                bestMatch = faq;
                                highestPriority = faq.priority;
                            }
                        }
                    }
                }

                return bestMatch;
            }

            async processMessage(message) {
                const messageLower = message.toLowerCase();

                // Check for agent/human requests
                if (messageLower.includes('agent') || messageLower.includes('human') || 
                    messageLower.includes('live person') || messageLower.includes('speak to someone')) {
                    return this.getFallbackResponse();
                }

                // Check for repeated questions
                const match = this.findBestMatch(message);
                if (match) {
                    const keywordFound = match.keywords.find(k => messageLower.includes(k.toLowerCase()));
                    if (this.session.askedKeywords.includes(keywordFound)) {
                        return "You already asked about that—do you want more detail or speak to an agent instead?";
                    }
                    this.session.askedKeywords.push(keywordFound);
                    return match.answer;
                }

                // Fallback for unmatched input
                return this.getFallbackResponse();
            }

            getFallbackResponse() {
                return {
                    message: "I'm sorry—I don't have an answer for that. Would you like to talk to a real agent?",
                    showButtons: true
                };
            }

            addMessage(content, isUser = false, showButtons = false) {
                const messagesContainer = document.getElementById('chatMessages');
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${isUser ? 'user' : ''}`;

                if (!isUser) {
                    const avatar = document.createElement('div');
                    avatar.className = 'bot-avatar animate-ping';
                    avatar.innerHTML = '<i class="fas fa-robot"></i>';
                    messageDiv.appendChild(avatar);
                }

                const messageContent = document.createElement('div');
                messageContent.className = 'message-content';
                messageContent.innerHTML = content;

                if (showButtons) {
                    const buttonContainer = document.createElement('div');
                    buttonContainer.className = 'action-buttons';
                    buttonContainer.innerHTML = `
                        <button class="action-btn" onclick="chatBot.handleAgentRequest(true)">Yes – Talk to agent</button>
                        <button class="action-btn" onclick="chatBot.handleAgentRequest(false)">No – Try again</button>
                    `;
                    messageContent.appendChild(buttonContainer);
                }

                messageDiv.appendChild(messageContent);
                messagesContainer.appendChild(messageDiv);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }

            handleAgentRequest(wantsAgent) {
                if (wantsAgent) {
                    this.addMessage("Email us at info@afavirtuals.com or WhatsApp us at +250 798 971 739. We'll reply within a few hours!");
                } else {
                    this.addMessage("No problem—feel free to rephrase or ask something else.");
                }
            }

            showTyping() {
                document.getElementById('typingIndicator').classList.add('show');
                const messagesContainer = document.getElementById('chatMessages');
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }

            hideTyping() {
                document.getElementById('typingIndicator').classList.remove('show');
            }

            toggleChat() {
                const container = document.getElementById('chatContainer');
                const isActive = container.classList.contains('active');
                
                if (isActive) {
                    container.classList.remove('active');
                } else {
                    container.classList.add('active');
                    this.session.chatStarted = true;
                    this.hidePopup();
                    document.getElementById('messageInput').focus();
                }
            }

            async sendMessage(messageText) {
                if (!messageText.trim()) return;

                // Add user message
                this.addMessage(messageText, true);
                
                // Clear input
                document.getElementById('messageInput').value = '';
                
                // Show typing indicator
                this.showTyping();
                
                // Simulate processing delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Process message and get response
                const response = await this.processMessage(messageText);
                
                // Hide typing indicator
                this.hideTyping();
                
                // Add bot response
                if (typeof response === 'object') {
                    this.addMessage(response.message, false, response.showButtons);
                } else {
                    this.addMessage(response);
                }
            }
        }

        // Initialize chat system
        const chatBot = new VolkovChat();

        // Global functions for UI interaction
        function acceptChat() {
            chatBot.hidePopup();
            chatBot.toggleChat();
        }

        function declineChat() {
            chatBot.hidePopup();
        }

        function toggleChat() {
            chatBot.toggleChat();
        }

        function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value.trim();
            if (message) {
                chatBot.sendMessage(message);
            }
        }

        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }

        // Auto-focus input when chat opens
        document.getElementById('messageInput').addEventListener('focus', function() {
            setTimeout(() => {
                const messagesContainer = document.getElementById('chatMessages');
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 100);
        });