
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

export default function AIChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I&apos;m your FeetGPT assistant. I&apos;m here to help you with questions about foot health, care, and wellness. What would you like to know?',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI response (replace with actual AI call later)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getSimulatedResponse(userMessage.content),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  // Simulated responses - replace with actual AI integration
  const getSimulatedResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('pain') || lowerQuestion.includes('hurt')) {
      return 'Foot pain can have many causes. Common issues include:\n\n- Plantar fasciitis (heel pain)\n- Bunions or hammertoes\n- Improper footwear\n- Overuse or strain\n\nIf you&apos;re experiencing persistent pain, I recommend consulting a podiatrist for a proper diagnosis. In the meantime, rest, ice, and proper footwear can help.';
    }

    if (lowerQuestion.includes('care') || lowerQuestion.includes('routine')) {
      return 'A good foot care routine includes:\n\n1. Daily washing with mild soap and warm water\n2. Thorough drying, especially between toes\n3. Moisturizing with foot cream (avoid between toes)\n4. Regular nail trimming (straight across)\n5. Wearing clean, breathable socks\n6. Choosing comfortable, well-fitting shoes\n\nConsistency is key to healthy feet!';
    }

    if (lowerQuestion.includes('smell') || lowerQuestion.includes('odor')) {
      return 'Foot odor is common and manageable! Here&apos;s what helps:\n\n- Wash feet daily with antibacterial soap\n- Dry thoroughly, especially between toes\n- Use foot powder or antiperspirant\n- Wear moisture-wicking socks\n- Rotate shoes to let them air out\n- Consider cedar shoe inserts\n\nIf odor persists, it might indicate a fungal infection - consult a healthcare provider.';
    }

    if (lowerQuestion.includes('fungus') || lowerQuestion.includes('athlete')) {
      return 'Fungal infections like athlete&apos;s foot are treatable:\n\n- Keep feet clean and dry\n- Use over-the-counter antifungal creams\n- Wear breathable shoes and socks\n- Avoid walking barefoot in public areas\n- Change socks daily\n\nIf symptoms persist after 2 weeks of treatment, see a healthcare provider.';
    }

    if (lowerQuestion.includes('callus') || lowerQuestion.includes('corn')) {
      return 'Calluses and corns develop from friction and pressure:\n\n- Soak feet in warm water to soften\n- Gently file with a pumice stone\n- Moisturize regularly\n- Wear properly fitting shoes\n- Use protective pads if needed\n\nNever cut calluses yourself. If they&apos;re painful or persistent, see a podiatrist.';
    }

    if (lowerQuestion.includes('nail') || lowerQuestion.includes('ingrown')) {
      return 'Proper nail care is important:\n\n- Trim nails straight across, not curved\n- Don&apos;t cut too short\n- Use proper nail clippers\n- Keep nails clean\n\nFor ingrown toenails:\n- Soak in warm water\n- Gently lift the nail edge\n- See a podiatrist if infected or very painful';
    }

    if (lowerQuestion.includes('exercise') || lowerQuestion.includes('stretch')) {
      return 'Foot exercises strengthen and maintain flexibility:\n\n1. Toe curls: Pick up small objects with toes\n2. Ankle circles: Rotate ankles both directions\n3. Calf stretches: Lean against wall, stretch back leg\n4. Toe spreads: Spread toes apart, hold 5 seconds\n5. Arch lifts: Lift arch while keeping toes down\n\nDo these daily for best results!';
    }

    if (lowerQuestion.includes('shoe') || lowerQuestion.includes('footwear')) {
      return 'Choosing the right shoes is crucial:\n\n- Measure feet regularly (they change over time)\n- Shop in the afternoon (feet swell during day)\n- Ensure thumb&apos;s width between longest toe and shoe end\n- Look for good arch support\n- Choose breathable materials\n- Replace worn-out shoes\n\nComfort should be immediate - don&apos;t expect shoes to "break in".';
    }

    if (lowerQuestion.includes('diabetes') || lowerQuestion.includes('diabetic')) {
      return 'Diabetic foot care is critical:\n\n- Inspect feet daily for cuts, blisters, or changes\n- Keep feet clean and moisturized\n- Never go barefoot\n- Wear proper diabetic socks\n- See a podiatrist regularly\n- Control blood sugar levels\n\nAny foot injury requires immediate medical attention for people with diabetes.';
    }

    if (lowerQuestion.includes('flat') || lowerQuestion.includes('arch')) {
      return 'Flat feet or arch issues are common:\n\n- Many people have flat feet without problems\n- Supportive shoes with good arch support help\n- Custom orthotics may be beneficial\n- Strengthening exercises can help\n- Proper footwear is essential\n\nIf causing pain, consult a podiatrist about treatment options.';
    }

    // Default response
    return 'That&apos;s a great question about foot health! While I can provide general information, I recommend consulting with a podiatrist or healthcare provider for personalized advice, especially for:\n\n- Persistent pain or discomfort\n- Visible changes in foot structure\n- Infections or wounds\n- Chronic conditions\n\nYour feet are unique and deserve professional care when needed. Is there a specific aspect of foot health you&apos;d like to know more about?';
  };

  const suggestedQuestions = [
    'How do I care for my feet daily?',
    'What causes foot pain?',
    'How can I prevent foot odor?',
    'What are good foot exercises?',
  ];

  const handleSuggestedQuestion = (question: string) => {
    setInputText(question);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Ask AI About Your Feet',
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
        }}
      />
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          {/* Messages Area */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={[
              styles.messagesContent,
              Platform.OS !== 'ios' && styles.messagesContentWithTabBar,
            ]}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageWrapper,
                  message.role === 'user' ? styles.userMessageWrapper : styles.assistantMessageWrapper,
                ]}
              >
                <View
                  style={[
                    styles.messageBubble,
                    message.role === 'user' ? styles.userMessage : styles.assistantMessage,
                  ]}
                >
                  {message.role === 'assistant' && (
                    <View style={styles.assistantIcon}>
                      <IconSymbol name="sparkles" size={16} color={colors.accent} />
                    </View>
                  )}
                  <Text
                    style={[
                      styles.messageText,
                      message.role === 'user' ? styles.userMessageText : styles.assistantMessageText,
                    ]}
                  >
                    {message.content}
                  </Text>
                </View>
              </View>
            ))}

            {isLoading && (
              <View style={styles.loadingWrapper}>
                <View style={styles.loadingBubble}>
                  <ActivityIndicator size="small" color={colors.primary} />
                  <Text style={styles.loadingText}>Thinking...</Text>
                </View>
              </View>
            )}

            {/* Suggested Questions (show only at start) */}
            {messages.length === 1 && !isLoading && (
              <View style={styles.suggestionsContainer}>
                <Text style={styles.suggestionsTitle}>Try asking:</Text>
                {suggestedQuestions.map((question, index) => (
                  <Pressable
                    key={index}
                    style={styles.suggestionButton}
                    onPress={() => handleSuggestedQuestion(question)}
                  >
                    <IconSymbol name="lightbulb.fill" size={16} color={colors.primary} />
                    <Text style={styles.suggestionText}>{question}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </ScrollView>

          {/* Input Area */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Ask about your feet..."
                placeholderTextColor={colors.textSecondary}
                multiline
                maxLength={500}
                editable={!isLoading}
              />
              <Pressable
                style={[styles.sendButton, (!inputText.trim() || isLoading) && styles.sendButtonDisabled]}
                onPress={handleSend}
                disabled={!inputText.trim() || isLoading}
              >
                <IconSymbol
                  name="arrow.up.circle.fill"
                  size={32}
                  color={inputText.trim() && !isLoading ? colors.primary : colors.textSecondary}
                />
              </Pressable>
            </View>
            <Text style={styles.disclaimer}>
              This AI provides general information only. Consult a healthcare professional for medical advice.
            </Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  messagesContentWithTabBar: {
    paddingBottom: 100,
  },
  messageWrapper: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  assistantMessageWrapper: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 16,
    padding: 12,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    elevation: 1,
  },
  userMessage: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  assistantMessage: {
    backgroundColor: colors.card,
    borderBottomLeftRadius: 4,
  },
  assistantIcon: {
    marginBottom: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userMessageText: {
    color: colors.card,
  },
  assistantMessageText: {
    color: colors.text,
  },
  loadingWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 12,
  },
  loadingBubble: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    elevation: 1,
  },
  loadingText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  suggestionsContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  suggestionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 12,
  },
  suggestionButton: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    elevation: 1,
  },
  suggestionText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  inputContainer: {
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.highlight,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.text,
    maxHeight: 100,
    minHeight: 40,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  disclaimer: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 14,
  },
});
