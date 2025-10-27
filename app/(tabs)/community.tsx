
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Pressable, TextInput, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

type InsecurityPost = {
  id: string;
  text: string;
  matchCount: number;
  timestamp: string;
};

type Match = {
  id: string;
  insecurity: string;
  users: string[];
  messages: Array<{
    id: string;
    user: string;
    text: string;
    timestamp: string;
  }>;
};

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState<'post' | 'matches'>('post');

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Community',
            headerLargeTitle: true,
          }}
        />
      )}
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <IconSymbol name="person.3.fill" size={48} color={colors.primary} />
            <Text style={styles.headerTitle}>Support Community</Text>
            <Text style={styles.headerSubtitle}>
              Share experiences and find common ground
            </Text>
          </View>

          {/* Privacy Notice */}
          <View style={styles.privacyNotice}>
            <IconSymbol name="lock.shield.fill" size={20} color={colors.primary} />
            <Text style={styles.privacyText}>
              All posts and chats are completely anonymous. Your identity is never shared.
            </Text>
          </View>

          {/* Tab Selector */}
          <View style={styles.tabSelector}>
            <Pressable
              style={[
                styles.tabButton,
                activeTab === 'post' && styles.tabButtonActive
              ]}
              onPress={() => setActiveTab('post')}
            >
              <IconSymbol
                name="square.and.pencil"
                size={20}
                color={activeTab === 'post' ? colors.card : colors.textSecondary}
              />
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === 'post' && styles.tabButtonTextActive
                ]}
              >
                Share Insecurity
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.tabButton,
                activeTab === 'matches' && styles.tabButtonActive
              ]}
              onPress={() => setActiveTab('matches')}
            >
              <IconSymbol
                name="person.2.fill"
                size={20}
                color={activeTab === 'matches' ? colors.card : colors.textSecondary}
              />
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === 'matches' && styles.tabButtonTextActive
                ]}
              >
                My Matches
              </Text>
            </Pressable>
          </View>

          {/* Content */}
          {activeTab === 'post' && <SharedInsecurityPost />}
          {activeTab === 'matches' && <CommonGroundMatcher />}

          {/* Bottom Spacer */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
    </>
  );
}

function SharedInsecurityPost() {
  const [posts, setPosts] = useState<InsecurityPost[]>([
    {
      id: '1',
      text: 'I hate my bunions',
      matchCount: 12,
      timestamp: '2024-01-15',
    },
    {
      id: '2',
      text: 'I am terrified of people seeing my toes',
      matchCount: 8,
      timestamp: '2024-01-14',
    },
    {
      id: '3',
      text: 'My feet are too wide and I can never find shoes',
      matchCount: 15,
      timestamp: '2024-01-13',
    },
  ]);

  const [newPost, setNewPost] = useState('');
  const [showForm, setShowForm] = useState(false);

  const submitPost = () => {
    if (!newPost.trim()) {
      Alert.alert('Empty Post', 'Please write your insecurity to share.');
      return;
    }

    const post: InsecurityPost = {
      id: Date.now().toString(),
      text: newPost.trim(),
      matchCount: 0,
      timestamp: new Date().toISOString().split('T')[0],
    };

    setPosts([post, ...posts]);
    setNewPost('');
    setShowForm(false);
    
    Alert.alert(
      'Posted Successfully',
      'Your insecurity has been shared anonymously. We\'ll notify you when we find others with the same concern.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.postContent}>
      {/* Info */}
      <View style={styles.infoCard}>
        <IconSymbol name="info.circle.fill" size={24} color={colors.primary} />
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>How it works</Text>
          <Text style={styles.infoText}>
            Share a specific insecurity about your feet anonymously. 
            When others post the same concern, you&apos;ll be matched for mutual support.
          </Text>
        </View>
      </View>

      {/* New Post Button */}
      {!showForm && (
        <Pressable
          style={styles.newPostButton}
          onPress={() => setShowForm(true)}
        >
          <IconSymbol name="plus.circle.fill" size={24} color={colors.card} />
          <Text style={styles.newPostButtonText}>Share Your Insecurity</Text>
        </Pressable>
      )}

      {/* New Post Form */}
      {showForm && (
        <View style={styles.postForm}>
          <Text style={styles.formTitle}>What concerns you about your feet?</Text>
          <TextInput
            style={styles.postInput}
            placeholder="e.g., I hate my bunions, My toes are crooked..."
            placeholderTextColor={colors.textSecondary}
            value={newPost}
            onChangeText={setNewPost}
            multiline
            numberOfLines={4}
            maxLength={200}
          />
          <Text style={styles.charCount}>{newPost.length}/200</Text>
          
          <View style={styles.formActions}>
            <Pressable
              style={[styles.formButton, styles.formButtonCancel]}
              onPress={() => {
                setShowForm(false);
                setNewPost('');
              }}
            >
              <Text style={styles.formButtonCancelText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.formButton, styles.formButtonSubmit]}
              onPress={submitPost}
            >
              <Text style={styles.formButtonSubmitText}>Post Anonymously</Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* Common Insecurities */}
      <View style={styles.commonInsecurities}>
        <Text style={styles.sectionTitle}>Common Shared Insecurities</Text>
        <Text style={styles.sectionSubtitle}>
          See what others are concerned about - you&apos;re not alone
        </Text>

        <View style={styles.postsList}>
          {posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <IconSymbol name="person.fill.questionmark" size={20} color={colors.textSecondary} />
                <Text style={styles.postDate}>{post.timestamp}</Text>
              </View>
              
              <Text style={styles.postText}>&quot;{post.text}&quot;</Text>
              
              <View style={styles.postFooter}>
                <View style={styles.matchBadge}>
                  <IconSymbol name="person.2.fill" size={14} color={colors.primary} />
                  <Text style={styles.matchCount}>
                    {post.matchCount} {post.matchCount === 1 ? 'person' : 'people'} share this
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Encouragement */}
      <View style={styles.encouragement}>
        <IconSymbol name="heart.fill" size={24} color={colors.accent} />
        <Text style={styles.encouragementText}>
          Remember: Every insecurity you have is shared by countless others. 
          You&apos;re taking a brave step by acknowledging it.
        </Text>
      </View>
    </View>
  );
}

function CommonGroundMatcher() {
  const [matches, setMatches] = useState<Match[]>([
    {
      id: '1',
      insecurity: 'I hate my bunions',
      users: ['User A', 'User B', 'User C'],
      messages: [
        {
          id: '1',
          user: 'User A',
          text: 'I felt so alone with this issue. Glad to find others!',
          timestamp: '10:30 AM',
        },
        {
          id: '2',
          user: 'User B',
          text: 'Same here! Has anyone tried any treatments that helped?',
          timestamp: '10:35 AM',
        },
        {
          id: '3',
          user: 'User C',
          text: 'I started wearing wider shoes and it made a huge difference in comfort.',
          timestamp: '10:40 AM',
        },
      ],
    },
  ]);

  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = (matchId: string) => {
    if (!newMessage.trim()) return;

    setMatches(matches.map(match => {
      if (match.id === matchId) {
        return {
          ...match,
          messages: [
            ...match.messages,
            {
              id: Date.now().toString(),
              user: 'You',
              text: newMessage.trim(),
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ],
        };
      }
      return match;
    }));

    setNewMessage('');
  };

  return (
    <View style={styles.matchesContent}>
      {/* Info */}
      <View style={styles.infoCard}>
        <IconSymbol name="info.circle.fill" size={24} color={colors.primary} />
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Your Matches</Text>
          <Text style={styles.infoText}>
            When 3+ people share the same insecurity, you&apos;re matched for a private, 
            time-limited group chat for support and advice.
          </Text>
        </View>
      </View>

      {matches.length === 0 ? (
        <View style={styles.noMatches}>
          <IconSymbol name="magnifyingglass" size={48} color={colors.textSecondary} />
          <Text style={styles.noMatchesTitle}>No matches yet</Text>
          <Text style={styles.noMatchesText}>
            Share an insecurity in the other tab to find others with the same concern.
          </Text>
        </View>
      ) : (
        <View style={styles.matchesList}>
          {matches.map((match) => (
            <View key={match.id} style={styles.matchCard}>
              <View style={styles.matchHeader}>
                <View style={styles.matchInfo}>
                  <Text style={styles.matchInsecurity}>&quot;{match.insecurity}&quot;</Text>
                  <View style={styles.matchUsers}>
                    <IconSymbol name="person.3.fill" size={14} color={colors.primary} />
                    <Text style={styles.matchUsersText}>
                      {match.users.length} people in this group
                    </Text>
                  </View>
                </View>
              </View>

              {/* Messages */}
              <View style={styles.messagesContainer}>
                {match.messages.map((message) => (
                  <View
                    key={message.id}
                    style={[
                      styles.messageBubble,
                      message.user === 'You' && styles.messageBubbleOwn
                    ]}
                  >
                    <Text style={styles.messageUser}>{message.user}</Text>
                    <Text style={styles.messageText}>{message.text}</Text>
                    <Text style={styles.messageTime}>{message.timestamp}</Text>
                  </View>
                ))}
              </View>

              {/* Message Input */}
              {selectedMatch === match.id ? (
                <View style={styles.messageInput}>
                  <TextInput
                    style={styles.messageTextInput}
                    placeholder="Type your message..."
                    placeholderTextColor={colors.textSecondary}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    multiline
                  />
                  <View style={styles.messageActions}>
                    <Pressable
                      style={styles.messageActionButton}
                      onPress={() => setSelectedMatch(null)}
                    >
                      <Text style={styles.messageActionCancel}>Cancel</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.messageActionButton, styles.messageActionSend]}
                      onPress={() => sendMessage(match.id)}
                    >
                      <IconSymbol name="paperplane.fill" size={16} color={colors.card} />
                      <Text style={styles.messageActionSendText}>Send</Text>
                    </Pressable>
                  </View>
                </View>
              ) : (
                <Pressable
                  style={styles.replyButton}
                  onPress={() => setSelectedMatch(match.id)}
                >
                  <IconSymbol name="bubble.left.and.bubble.right.fill" size={16} color={colors.primary} />
                  <Text style={styles.replyButtonText}>Reply to group</Text>
                </Pressable>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Guidelines */}
      <View style={styles.guidelines}>
        <Text style={styles.guidelinesTitle}>Group Chat Guidelines</Text>
        <Text style={styles.guidelineItem}>• Be supportive and empathetic</Text>
        <Text style={styles.guidelineItem}>• Share experiences and advice</Text>
        <Text style={styles.guidelineItem}>• Respect everyone&apos;s privacy</Text>
        <Text style={styles.guidelineItem}>• Report any inappropriate behavior</Text>
        <Text style={styles.guidelineNote}>
          Note: Group chats are time-limited to 7 days to maintain focus and freshness.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginTop: 12,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  privacyNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.primary + '10',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  privacyText: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
    lineHeight: 18,
  },
  tabSelector: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.highlight,
    gap: 8,
  },
  tabButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabButtonTextActive: {
    color: colors.card,
  },
  postContent: {
    marginBottom: 24,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  newPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  newPostButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.card,
  },
  postForm: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  postInput: {
    backgroundColor: colors.highlight,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: colors.text,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'right',
    marginTop: 4,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  formButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  formButtonCancel: {
    backgroundColor: colors.highlight,
  },
  formButtonCancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  formButtonSubmit: {
    backgroundColor: colors.primary,
  },
  formButtonSubmitText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.card,
  },
  commonInsecurities: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  postsList: {
    gap: 12,
  },
  postCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.06)',
    elevation: 1,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  postDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  postText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  matchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary + '10',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  matchCount: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  encouragement: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: colors.accent + '10',
    padding: 16,
    borderRadius: 12,
  },
  encouragementText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  matchesContent: {
    marginBottom: 24,
  },
  noMatches: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noMatchesTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  noMatchesText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },
  matchesList: {
    gap: 20,
    marginBottom: 24,
  },
  matchCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  matchHeader: {
    marginBottom: 16,
  },
  matchInfo: {
    gap: 8,
  },
  matchInsecurity: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    fontStyle: 'italic',
  },
  matchUsers: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  matchUsersText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  messagesContainer: {
    gap: 12,
    marginBottom: 16,
  },
  messageBubble: {
    backgroundColor: colors.highlight,
    padding: 12,
    borderRadius: 12,
    maxWidth: '85%',
  },
  messageBubbleOwn: {
    backgroundColor: colors.primary + '15',
    alignSelf: 'flex-end',
  },
  messageUser: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 4,
  },
  messageTime: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  messageInput: {
    marginTop: 8,
  },
  messageTextInput: {
    backgroundColor: colors.highlight,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: colors.text,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  messageActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 8,
  },
  messageActionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  messageActionCancel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  messageActionSend: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  messageActionSendText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.card,
  },
  replyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    backgroundColor: colors.primary + '10',
    borderRadius: 8,
  },
  replyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  guidelines: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  guidelinesTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  guidelineItem: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 4,
  },
  guidelineNote: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 8,
    lineHeight: 18,
  },
  bottomSpacer: {
    height: 40,
  },
});
