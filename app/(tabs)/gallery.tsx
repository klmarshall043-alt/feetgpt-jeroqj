
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Pressable, Image, TextInput, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import * as ImagePicker from 'expo-image-picker';

type GalleryImage = {
  id: string;
  uri: string;
  comments: string[];
  description: string;
};

export default function GalleryScreen() {
  const [activeTab, setActiveTab] = useState<'gallery' | 'journal'>('gallery');

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Gallery',
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
            <IconSymbol name="photo.fill" size={48} color={colors.primary} />
            <Text style={styles.headerTitle}>Normalization Gallery</Text>
            <Text style={styles.headerSubtitle}>
              Celebrate the natural diversity of feet
            </Text>
          </View>

          {/* Tab Selector */}
          <View style={styles.tabSelector}>
            <Pressable
              style={[
                styles.tabButton,
                activeTab === 'gallery' && styles.tabButtonActive
              ]}
              onPress={() => setActiveTab('gallery')}
            >
              <IconSymbol
                name="photo.on.rectangle"
                size={20}
                color={activeTab === 'gallery' ? colors.card : colors.textSecondary}
              />
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === 'gallery' && styles.tabButtonTextActive
                ]}
              >
                Feet in the Wild
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.tabButton,
                activeTab === 'journal' && styles.tabButtonActive
              ]}
              onPress={() => setActiveTab('journal')}
            >
              <IconSymbol
                name="book.fill"
                size={20}
                color={activeTab === 'journal' ? colors.card : colors.textSecondary}
              />
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === 'journal' && styles.tabButtonTextActive
                ]}
              >
                My Journal
              </Text>
            </Pressable>
          </View>

          {/* Content */}
          {activeTab === 'gallery' && <FeetGallery />}
          {activeTab === 'journal' && <PerspectiveJournal />}

          {/* Bottom Spacer */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
    </>
  );
}

function FeetGallery() {
  const [images, setImages] = useState<GalleryImage[]>([
    {
      id: '1',
      uri: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=400',
      comments: ['These look strong and healthy!', 'Beautiful natural shape'],
      description: 'Walking on the beach',
    },
    {
      id: '2',
      uri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      comments: ['Love the natural look', 'Great care taken here'],
      description: 'Relaxing at home',
    },
    {
      id: '3',
      uri: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400',
      comments: ['Appreciate the diversity', 'Every foot is unique!'],
      description: 'Morning yoga',
    },
  ]);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const newImage: GalleryImage = {
        id: Date.now().toString(),
        uri: result.assets[0].uri,
        comments: [],
        description: 'My contribution',
      };
      setImages([newImage, ...images]);
      Alert.alert('Success', 'Your photo has been added to the gallery!');
    }
  };

  const addComment = (imageId: string) => {
    if (!newComment.trim()) return;

    setImages(images.map(img => {
      if (img.id === imageId) {
        return {
          ...img,
          comments: [...img.comments, newComment.trim()],
        };
      }
      return img;
    }));
    setNewComment('');
    Alert.alert('Thank you!', 'Your supportive comment has been added.');
  };

  return (
    <View style={styles.galleryContent}>
      {/* Info Banner */}
      <View style={styles.infoBanner}>
        <IconSymbol name="info.circle.fill" size={20} color={colors.primary} />
        <Text style={styles.infoBannerText}>
          This is a safe space to view and appreciate the natural diversity of feet. All submissions are moderated.
        </Text>
      </View>

      {/* Upload Button */}
      <Pressable style={styles.uploadButton} onPress={pickImage}>
        <IconSymbol name="plus.circle.fill" size={24} color={colors.card} />
        <Text style={styles.uploadButtonText}>Share Anonymously</Text>
      </Pressable>

      {/* Gallery Grid */}
      <View style={styles.galleryGrid}>
        {images.map((image) => (
          <View key={image.id} style={styles.galleryItem}>
            <Image
              source={{ uri: image.uri }}
              style={styles.galleryImage}
              resizeMode="cover"
            />
            <View style={styles.imageOverlay}>
              <Text style={styles.imageDescription}>{image.description}</Text>
            </View>
            
            {/* Comments Section */}
            <View style={styles.commentsSection}>
              <Text style={styles.commentsTitle}>Supportive Comments</Text>
              {image.comments.length === 0 ? (
                <Text style={styles.noComments}>Be the first to leave a supportive comment</Text>
              ) : (
                image.comments.map((comment, index) => (
                  <View key={index} style={styles.commentBubble}>
                    <IconSymbol name="heart.fill" size={12} color={colors.accent} />
                    <Text style={styles.commentText}>{comment}</Text>
                  </View>
                ))
              )}
              
              {/* Add Comment */}
              {selectedImage === image.id ? (
                <View style={styles.commentInput}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Leave a supportive comment..."
                    placeholderTextColor={colors.textSecondary}
                    value={newComment}
                    onChangeText={setNewComment}
                    multiline
                  />
                  <View style={styles.commentActions}>
                    <Pressable
                      style={styles.commentActionButton}
                      onPress={() => setSelectedImage(null)}
                    >
                      <Text style={styles.commentActionCancel}>Cancel</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.commentActionButton, styles.commentActionSubmit]}
                      onPress={() => addComment(image.id)}
                    >
                      <Text style={styles.commentActionSubmitText}>Post</Text>
                    </Pressable>
                  </View>
                </View>
              ) : (
                <Pressable
                  style={styles.addCommentButton}
                  onPress={() => setSelectedImage(image.id)}
                >
                  <IconSymbol name="plus.circle" size={16} color={colors.primary} />
                  <Text style={styles.addCommentText}>Add supportive comment</Text>
                </Pressable>
              )}
            </View>
          </View>
        ))}
      </View>

      {/* Guidelines */}
      <View style={styles.guidelines}>
        <Text style={styles.guidelinesTitle}>Community Guidelines</Text>
        <Text style={styles.guidelineItem}>• Focus on function and care, not appearance</Text>
        <Text style={styles.guidelineItem}>• Be supportive and non-critical</Text>
        <Text style={styles.guidelineItem}>• Celebrate diversity and uniqueness</Text>
        <Text style={styles.guidelineItem}>• Report any inappropriate content</Text>
      </View>
    </View>
  );
}

function PerspectiveJournal() {
  const [entries, setEntries] = useState<Array<{
    id: string;
    date: string;
    beforeFeeling: string;
    afterFeeling: string;
    activity: string;
  }>>([
    {
      id: '1',
      date: '2024-01-15',
      beforeFeeling: 'Anxious about my feet',
      afterFeeling: 'More accepting and calm',
      activity: 'Viewed gallery for 10 minutes',
    },
  ]);

  const [showNewEntry, setShowNewEntry] = useState(false);
  const [beforeFeeling, setBeforeFeeling] = useState('');
  const [afterFeeling, setAfterFeeling] = useState('');
  const [activity, setActivity] = useState('');

  const addEntry = () => {
    if (!beforeFeeling.trim() || !afterFeeling.trim() || !activity.trim()) {
      Alert.alert('Missing Information', 'Please fill in all fields');
      return;
    }

    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      beforeFeeling: beforeFeeling.trim(),
      afterFeeling: afterFeeling.trim(),
      activity: activity.trim(),
    };

    setEntries([newEntry, ...entries]);
    setBeforeFeeling('');
    setAfterFeeling('');
    setActivity('');
    setShowNewEntry(false);
    Alert.alert('Success', 'Journal entry saved!');
  };

  return (
    <View style={styles.journalContent}>
      {/* Info */}
      <View style={styles.journalInfo}>
        <IconSymbol name="book.fill" size={24} color={colors.primary} />
        <Text style={styles.journalInfoText}>
          Track your feelings before and after engaging with the gallery or self-care routines. 
          This private journal helps you see your progress over time.
        </Text>
      </View>

      {/* New Entry Button */}
      {!showNewEntry && (
        <Pressable
          style={styles.newEntryButton}
          onPress={() => setShowNewEntry(true)}
        >
          <IconSymbol name="plus.circle.fill" size={24} color={colors.card} />
          <Text style={styles.newEntryButtonText}>New Journal Entry</Text>
        </Pressable>
      )}

      {/* New Entry Form */}
      {showNewEntry && (
        <View style={styles.entryForm}>
          <Text style={styles.formLabel}>Activity</Text>
          <TextInput
            style={styles.formInput}
            placeholder="What did you do? (e.g., viewed gallery, foot care routine)"
            placeholderTextColor={colors.textSecondary}
            value={activity}
            onChangeText={setActivity}
          />

          <Text style={styles.formLabel}>How did you feel before?</Text>
          <TextInput
            style={[styles.formInput, styles.formTextArea]}
            placeholder="Describe your feelings..."
            placeholderTextColor={colors.textSecondary}
            value={beforeFeeling}
            onChangeText={setBeforeFeeling}
            multiline
            numberOfLines={3}
          />

          <Text style={styles.formLabel}>How do you feel after?</Text>
          <TextInput
            style={[styles.formInput, styles.formTextArea]}
            placeholder="Describe your feelings..."
            placeholderTextColor={colors.textSecondary}
            value={afterFeeling}
            onChangeText={setAfterFeeling}
            multiline
            numberOfLines={3}
          />

          <View style={styles.formActions}>
            <Pressable
              style={[styles.formButton, styles.formButtonCancel]}
              onPress={() => setShowNewEntry(false)}
            >
              <Text style={styles.formButtonCancelText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.formButton, styles.formButtonSubmit]}
              onPress={addEntry}
            >
              <Text style={styles.formButtonSubmitText}>Save Entry</Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* Entries List */}
      <View style={styles.entriesList}>
        <Text style={styles.entriesTitle}>Your Journey</Text>
        {entries.length === 0 ? (
          <Text style={styles.noEntries}>No entries yet. Start tracking your progress!</Text>
        ) : (
          entries.map((entry) => (
            <View key={entry.id} style={styles.entryCard}>
              <View style={styles.entryHeader}>
                <IconSymbol name="calendar" size={16} color={colors.textSecondary} />
                <Text style={styles.entryDate}>{entry.date}</Text>
              </View>
              
              <Text style={styles.entryActivity}>{entry.activity}</Text>
              
              <View style={styles.entryFeelings}>
                <View style={styles.feelingSection}>
                  <Text style={styles.feelingLabel}>Before:</Text>
                  <Text style={styles.feelingText}>{entry.beforeFeeling}</Text>
                </View>
                
                <IconSymbol name="arrow.right" size={20} color={colors.primary} />
                
                <View style={styles.feelingSection}>
                  <Text style={styles.feelingLabel}>After:</Text>
                  <Text style={styles.feelingText}>{entry.afterFeeling}</Text>
                </View>
              </View>
            </View>
          ))
        )}
      </View>

      {/* Progress Insight */}
      {entries.length > 0 && (
        <View style={styles.progressInsight}>
          <IconSymbol name="chart.line.uptrend.xyaxis" size={24} color={colors.primary} />
          <View style={styles.progressContent}>
            <Text style={styles.progressTitle}>Your Progress</Text>
            <Text style={styles.progressText}>
              You&apos;ve logged {entries.length} entr{entries.length === 1 ? 'y' : 'ies'}. 
              Keep tracking to see patterns in your journey toward acceptance and self-care.
            </Text>
          </View>
        </View>
      )}
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
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabButtonTextActive: {
    color: colors.card,
  },
  galleryContent: {
    marginBottom: 24,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: colors.primary + '10',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoBannerText: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
  },
  uploadButton: {
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
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.card,
  },
  galleryGrid: {
    gap: 20,
    marginBottom: 24,
  },
  galleryItem: {
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  galleryImage: {
    width: '100%',
    height: 250,
    backgroundColor: colors.highlight,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
  },
  imageDescription: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  commentsSection: {
    padding: 16,
  },
  commentsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  noComments: {
    fontSize: 13,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  commentBubble: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: colors.highlight,
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  commentText: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
  },
  commentInput: {
    marginTop: 8,
  },
  textInput: {
    backgroundColor: colors.highlight,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: colors.text,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  commentActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 8,
  },
  commentActionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  commentActionCancel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  commentActionSubmit: {
    backgroundColor: colors.primary,
  },
  commentActionSubmitText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.card,
  },
  addCommentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  addCommentText: {
    fontSize: 13,
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
  journalContent: {
    marginBottom: 24,
  },
  journalInfo: {
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
  journalInfoText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  newEntryButton: {
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
  newEntryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.card,
  },
  entryForm: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    marginTop: 12,
  },
  formInput: {
    backgroundColor: colors.highlight,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: colors.text,
  },
  formTextArea: {
    minHeight: 80,
    textAlignVertical: 'top',
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
  entriesList: {
    marginBottom: 24,
  },
  entriesTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  noEntries: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingVertical: 20,
  },
  entryCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.06)',
    elevation: 1,
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  entryDate: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  entryActivity: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  entryFeelings: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  feelingSection: {
    flex: 1,
  },
  feelingLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  feelingText: {
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
  },
  progressInsight: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: colors.primary + '10',
    padding: 16,
    borderRadius: 12,
  },
  progressContent: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  progressText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  bottomSpacer: {
    height: 40,
  },
});
