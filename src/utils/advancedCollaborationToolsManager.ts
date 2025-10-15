/**
 * Advanced Collaboration Tools Manager
 * 
 * Comprehensive utility for managing enterprise collaboration features including
 * video calls, screen sharing, real-time document collaboration, session management,
 * participant coordination, and advanced collaboration analytics.
 */

export interface VideoCall {
  id: string;
  title: string;
  description?: string;
  participants: VideoCallParticipant[];
  status: 'scheduled' | 'active' | 'ended' | 'recording' | 'paused';
  startTime: Date;
  endTime?: Date;
  duration?: number;
  recordingUrl?: string;
  chatMessages: ChatMessage[];
  meetingRoom?: {
    id: string;
    name: string;
    capacity: number;
    features: string[];
  };
  settings: {
    allowMuteAll: boolean;
    allowScreenShare: boolean;
    allowRecording: boolean;
    maxParticipants: number;
    waitingRoom: boolean;
    chatEnabled: boolean;
  };
  password?: string;
  meetingId?: string;
  joinUrl?: string;
}

export interface VideoCallParticipant {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'connected' | 'connecting' | 'disconnected' | 'muted' | 'speaking' | 'away';
  role: 'host' | 'co-host' | 'participant' | 'presenter';
  permissions: {
    canShare: boolean;
    canChat: boolean;
    canRecord: boolean;
    canMuteOthers: boolean;
  };
  deviceInfo: {
    camera: boolean;
    microphone: boolean;
    speakers: boolean;
    connection: 'excellent' | 'good' | 'fair' | 'poor';
  };
  joinedAt?: Date;
  leftAt?: Date;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'system' | 'file' | 'emoji' | 'reply';
  replyTo?: string;
  reactions?: {
    emoji: string;
    users: string[];
  }[];
  metadata?: {
    fileUrl?: string;
    fileName?: string;
    fileSize?: number;
    mentionedUsers?: string[];
  };
}

export interface ScreenShare {
  id: string;
  callId: string;
  sharerId: string;
  sharerName: string;
  title: string;
  type: 'screen' | 'window' | 'tab' | 'application' | 'whiteboard';
  status: 'active' | 'paused' | 'stopped';
  participants: string[];
  startTime: Date;
  endTime?: Date;
  annotations: ScreenAnnotation[];
  settings: {
    allowAnnotations: boolean;
    allowControl: boolean;
    maxAnnotators: number;
    recordingEnabled: boolean;
  };
  thumbnail?: string;
}

export interface ScreenAnnotation {
  id: string;
  type: 'drawing' | 'highlight' | 'text' | 'arrow' | 'shape' | 'sticker';
  data: any;
  authorId: string;
  authorName: string;
  timestamp: Date;
  color: string;
  thickness?: number;
  opacity?: number;
  visible: boolean;
}

export interface RealTimeDocument {
  id: string;
  title: string;
  content: string;
  contentType: 'text' | 'markdown' | 'code' | 'presentation';
  collaborators: DocumentCollaborator[];
  version: number;
  lastModified: Date;
  changes: DocumentChange[];
  permissions: {
    canView: string[];
    canEdit: string[];
    canComment: string[];
    canShare: string[];
  };
  settings: {
    autoSave: boolean;
    conflictResolution: 'last-write-wins' | 'merge' | 'manual';
    historyRetention: number;
    allowComments: boolean;
  };
  comments: DocumentComment[];
  history: DocumentVersion[];
}

export interface DocumentCollaborator {
  id: string;
  name: string;
  avatar?: string;
  cursor: { x: number; y: number };
  selection?: { start: number; end: number };
  color: string;
  status: 'active' | 'idle' | 'away';
  lastSeen: Date;
  permissions: {
    canEdit: boolean;
    canComment: boolean;
  };
}

export interface DocumentChange {
  id: string;
  authorId: string;
  authorName: string;
  type: 'insert' | 'delete' | 'format' | 'move' | 'replace';
  position: number;
  content?: string;
  oldContent?: string;
  length?: number;
  timestamp: Date;
  version: number;
  applied: boolean;
}

export interface DocumentComment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  position: number;
  timestamp: Date;
  resolved: boolean;
  replies: DocumentComment[];
  mentionedUsers: string[];
}

export interface DocumentVersion {
  version: number;
  content: string;
  authorId: string;
  authorName: string;
  timestamp: Date;
  description?: string;
  changes: DocumentChange[];
}

export interface CollaborationSession {
  id: string;
  name: string;
  description?: string;
  type: 'meeting' | 'workshop' | 'brainstorm' | 'review' | 'training' | 'presentation';
  participants: SessionParticipant[];
  status: 'active' | 'scheduled' | 'completed' | 'cancelled';
  startTime: Date;
  endTime?: Date;
  agenda: SessionAgenda[];
  recordings: SessionRecording[];
  notes: string;
  attachments: SessionAttachment[];
  outcomes: SessionOutcome[];
  settings: {
    allowLateJoin: boolean;
    requireApproval: boolean;
    maxParticipants: number;
    autoRecord: boolean;
    breakoutRooms: boolean;
  };
  roomInfo?: {
    name: string;
    capacity: number;
    features: string[];
  };
}

export interface SessionParticipant {
  id: string;
  name: string;
  email: string;
  role: 'organizer' | 'presenter' | 'participant' | 'observer';
  status: 'invited' | 'accepted' | 'declined' | 'tentative' | 'joined' | 'left';
  joinedAt?: Date;
  leftAt?: Date;
  contributions: number;
  engagementScore: number;
}

export interface SessionAgenda {
  id: string;
  title: string;
  description?: string;
  duration: number;
  startTime?: Date;
  completed: boolean;
  presenterId?: string;
  presenterName?: string;
  materials: string[];
  notes?: string;
  discussionPoints: string[];
}

export interface SessionRecording {
  id: string;
  url: string;
  duration: number;
  startTime: Date;
  participants: string[];
  quality: 'high' | 'medium' | 'low';
  size: number;
  transcript?: string;
  chapters?: {
    title: string;
    startTime: number;
    endTime: number;
  }[];
}

export interface SessionAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
  description?: string;
}

export interface SessionOutcome {
  id: string;
  type: 'decision' | 'action-item' | 'follow-up' | 'idea';
  title: string;
  description: string;
  assignedTo?: string[];
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'completed';
  createdBy: string;
  createdAt: Date;
}

export interface CollaborationAnalytics {
  sessionId?: string;
  callId?: string;
  documentId?: string;
  period: 'hour' | 'day' | 'week' | 'month';
  metrics: {
    totalParticipants: number;
    averageEngagement: number;
    totalDuration: number;
    messagesCount: number;
    documentsEdited: number;
    screenShares: number;
    annotationsCount: number;
  };
  participantMetrics: {
    userId: string;
    participationScore: number;
    speakingTime: number;
    messagesSent: number;
    documentsEdited: number;
    annotationCount: number;
  }[];
  trends: {
    engagement: number[];
    participation: number[];
    activity: number[];
    timestamps: Date[];
  };
}

export class AdvancedCollaborationToolsManager {
  private videoCalls: VideoCall[] = [];
  private screenShares: ScreenShare[] = [];
  private realTimeDocuments: RealTimeDocument[] = [];
  private collaborationSessions: CollaborationSession[] = [];
  private chatMessages: ChatMessage[] = [];
  private isInitialized = false;

  constructor() {
    this.initialize();
  }

  private async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await this.loadData();
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize Advanced Collaboration Tools Manager:', error);
    }
  }

  // Video Call Management
  async createVideoCall(callData: Omit<VideoCall, 'id' | 'chatMessages' | 'duration'>): Promise<VideoCall> {
    await this.initialize();

    const newCall: VideoCall = {
      ...callData,
      id: this.generateId(),
      chatMessages: [],
      joinUrl: this.generateJoinUrl(),
      meetingId: this.generateMeetingId()
    };

    this.videoCalls.push(newCall);
    await this.saveData();
    return newCall;
  }

  async updateVideoCall(callId: string, updates: Partial<VideoCall>): Promise<VideoCall | null> {
    await this.initialize();

    const callIndex = this.videoCalls.findIndex(call => call.id === callId);
    if (callIndex === -1) return null;

    this.videoCalls[callIndex] = { ...this.videoCalls[callIndex], ...updates };
    
    // Update duration if call ended
    if (updates.status === 'ended' && updates.endTime) {
      const duration = updates.endTime.getTime() - this.videoCalls[callIndex].startTime.getTime();
      this.videoCalls[callIndex].duration = duration;
    }

    await this.saveData();
    return this.videoCalls[callIndex];
  }

  async joinVideoCall(callId: string, participant: VideoCallParticipant): Promise<VideoCall | null> {
    await this.initialize();

    const call = await this.getVideoCallById(callId);
    if (!call) return null;

    // Add participant
    const existingParticipantIndex = call.participants.findIndex(p => p.id === participant.id);
    if (existingParticipantIndex >= 0) {
      call.participants[existingParticipantIndex] = { ...participant, joinedAt: new Date() };
    } else {
      call.participants.push({ ...participant, joinedAt: new Date() });
    }

    // Update call status if needed
    if (call.status === 'scheduled' && call.participants.length > 1) {
      call.status = 'active';
    }

    await this.saveData();
    return call;
  }

  async leaveVideoCall(callId: string, participantId: string): Promise<VideoCall | null> {
    await this.initialize();

    const call = await this.getVideoCallById(callId);
    if (!call) return null;

    const participantIndex = call.participants.findIndex(p => p.id === participantId);
    if (participantIndex >= 0) {
      call.participants[participantIndex].status = 'disconnected';
      call.participants[participantIndex].leftAt = new Date();

      // End call if host leaves and no co-host
      if (call.participants[participantIndex].role === 'host' && 
          !call.participants.some(p => p.role === 'co-host' && p.status !== 'disconnected')) {
        call.status = 'ended';
        call.endTime = new Date();
      }
    }

    await this.saveData();
    return call;
  }

  async getAllVideoCalls(): Promise<VideoCall[]> {
    await this.initialize();
    return [...this.videoCalls];
  }

  async getVideoCallById(callId: string): Promise<VideoCall | null> {
    await this.initialize();
    return this.videoCalls.find(call => call.id === callId) || null;
  }

  async getActiveVideoCalls(): Promise<VideoCall[]> {
    await this.initialize();
    return this.videoCalls.filter(call => call.status === 'active');
  }

  // Chat Message Management
  async sendChatMessage(callId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>): Promise<ChatMessage | null> {
    await this.initialize();

    const call = await this.getVideoCallById(callId);
    if (!call) return null;

    const newMessage: ChatMessage = {
      ...message,
      id: this.generateId(),
      timestamp: new Date()
    };

    call.chatMessages.push(newMessage);
    this.chatMessages.push(newMessage);
    
    await this.saveData();
    return newMessage;
  }

  async getChatMessages(callId: string): Promise<ChatMessage[]> {
    await this.initialize();
    const call = await this.getVideoCallById(callId);
    return call?.chatMessages || [];
  }

  // Screen Share Management
  async startScreenShare(shareData: Omit<ScreenShare, 'id' | 'startTime' | 'annotations'>): Promise<ScreenShare> {
    await this.initialize();

    const newShare: ScreenShare = {
      ...shareData,
      id: this.generateId(),
      startTime: new Date(),
      annotations: []
    };

    this.screenShares.push(newShare);
    await this.saveData();
    return newShare;
  }

  async stopScreenShare(shareId: string): Promise<ScreenShare | null> {
    await this.initialize();

    const shareIndex = this.screenShares.findIndex(share => share.id === shareId);
    if (shareIndex === -1) return null;

    this.screenShares[shareIndex].status = 'stopped';
    this.screenShares[shareIndex].endTime = new Date();
    
    await this.saveData();
    return this.screenShares[shareIndex];
  }

  async addScreenAnnotation(shareId: string, annotation: Omit<ScreenAnnotation, 'id' | 'timestamp'>): Promise<ScreenAnnotation | null> {
    await this.initialize();

    const shareIndex = this.screenShares.findIndex(share => share.id === shareId);
    if (shareIndex === -1) return null;

    const newAnnotation: ScreenAnnotation = {
      ...annotation,
      id: this.generateId(),
      timestamp: new Date()
    };

    this.screenShares[shareIndex].annotations.push(newAnnotation);
    await this.saveData();
    return newAnnotation;
  }

  async getAllScreenShares(): Promise<ScreenShare[]> {
    await this.initialize();
    return [...this.screenShares];
  }

  async getActiveScreenShares(): Promise<ScreenShare[]> {
    await this.initialize();
    return this.screenShares.filter(share => share.status === 'active');
  }

  // Real-Time Document Management
  async createRealTimeDocument(documentData: Omit<RealTimeDocument, 'id' | 'version' | 'lastModified' | 'changes' | 'comments' | 'history'>): Promise<RealTimeDocument> {
    await this.initialize();

    const newDocument: RealTimeDocument = {
      ...documentData,
      id: this.generateId(),
      version: 1,
      lastModified: new Date(),
      changes: [],
      comments: [],
      history: [{
        version: 1,
        content: documentData.content,
        authorId: documentData.collaborators[0]?.id || 'system',
        authorName: documentData.collaborators[0]?.name || 'System',
        timestamp: new Date(),
        changes: []
      }]
    };

    this.realTimeDocuments.push(newDocument);
    await this.saveData();
    return newDocument;
  }

  async updateDocumentContent(documentId: string, change: DocumentChange): Promise<RealTimeDocument | null> {
    await this.initialize();

    const docIndex = this.realTimeDocuments.findIndex(doc => doc.id === documentId);
    if (docIndex === -1) return null;

    const document = this.realTimeDocuments[docIndex];
    
    // Apply change to content
    change.version = document.version + 1;
    change.timestamp = new Date();
    change.applied = true;
    
    document.changes.push(change);
    document.version = change.version;
    document.lastModified = new Date();

    // Update content based on change type
    if (change.type === 'insert' && change.content) {
      document.content = document.content.slice(0, change.position) + change.content + document.content.slice(change.position);
    } else if (change.type === 'delete') {
      const endPos = change.position + (change.length || 0);
      document.content = document.content.slice(0, change.position) + document.content.slice(endPos);
    }

    // Add to history
    document.history.push({
      version: change.version,
      content: document.content,
      authorId: change.authorId,
      authorName: change.authorName,
      timestamp: new Date(),
      changes: [change]
    });

    await this.saveData();
    return document;
  }

  async addDocumentCollaborator(documentId: string, collaborator: DocumentCollaborator): Promise<RealTimeDocument | null> {
    await this.initialize();

    const docIndex = this.realTimeDocuments.findIndex(doc => doc.id === documentId);
    if (docIndex === -1) return null;

    const existingCollaboratorIndex = this.realTimeDocuments[docIndex].collaborators.findIndex(c => c.id === collaborator.id);
    if (existingCollaboratorIndex >= 0) {
      this.realTimeDocuments[docIndex].collaborators[existingCollaboratorIndex] = { ...collaborator, lastSeen: new Date() };
    } else {
      this.realTimeDocuments[docIndex].collaborators.push({ ...collaborator, lastSeen: new Date() });
    }

    await this.saveData();
    return this.realTimeDocuments[docIndex];
  }

  async addDocumentComment(documentId: string, comment: Omit<DocumentComment, 'id' | 'timestamp' | 'replies'>): Promise<DocumentComment | null> {
    await this.initialize();

    const docIndex = this.realTimeDocuments.findIndex(doc => doc.id === documentId);
    if (docIndex === -1) return null;

    const newComment: DocumentComment = {
      ...comment,
      id: this.generateId(),
      timestamp: new Date(),
      replies: []
    };

    this.realTimeDocuments[docIndex].comments.push(newComment);
    await this.saveData();
    return newComment;
  }

  async getAllRealTimeDocuments(): Promise<RealTimeDocument[]> {
    await this.initialize();
    return [...this.realTimeDocuments];
  }

  async getRealTimeDocumentById(documentId: string): Promise<RealTimeDocument | null> {
    await this.initialize();
    return this.realTimeDocuments.find(doc => doc.id === documentId) || null;
  }

  // Collaboration Session Management
  async createCollaborationSession(sessionData: Omit<CollaborationSession, 'id' | 'recordings' | 'notes' | 'attachments' | 'outcomes'>): Promise<CollaborationSession> {
    await this.initialize();

    const newSession: CollaborationSession = {
      ...sessionData,
      id: this.generateId(),
      recordings: [],
      notes: '',
      attachments: [],
      outcomes: []
    };

    this.collaborationSessions.push(newSession);
    await this.saveData();
    return newSession;
  }

  async updateCollaborationSession(sessionId: string, updates: Partial<CollaborationSession>): Promise<CollaborationSession | null> {
    await this.initialize();

    const sessionIndex = this.collaborationSessions.findIndex(session => session.id === sessionId);
    if (sessionIndex === -1) return null;

    this.collaborationSessions[sessionIndex] = { ...this.collaborationSessions[sessionIndex], ...updates };
    await this.saveData();
    return this.collaborationSessions[sessionIndex];
  }

  async addSessionOutcome(sessionId: string, outcome: Omit<SessionOutcome, 'id' | 'createdAt'>): Promise<SessionOutcome | null> {
    await this.initialize();

    const sessionIndex = this.collaborationSessions.findIndex(session => session.id === sessionId);
    if (sessionIndex === -1) return null;

    const newOutcome: SessionOutcome = {
      ...outcome,
      id: this.generateId(),
      createdAt: new Date()
    };

    this.collaborationSessions[sessionIndex].outcomes.push(newOutcome);
    await this.saveData();
    return newOutcome;
  }

  async getAllCollaborationSessions(): Promise<CollaborationSession[]> {
    await this.initialize();
    return [...this.collaborationSessions];
  }

  async getCollaborationSessionById(sessionId: string): Promise<CollaborationSession | null> {
    await this.initialize();
    return this.collaborationSessions.find(session => session.id === sessionId) || null;
  }

  async getActiveCollaborationSessions(): Promise<CollaborationSession[]> {
    await this.initialize();
    return this.collaborationSessions.filter(session => session.status === 'active');
  }

  // Analytics
  async getCollaborationAnalytics(sessionId?: string, callId?: string, documentId?: string, period: 'hour' | 'day' | 'week' | 'month' = 'day'): Promise<CollaborationAnalytics> {
    await this.initialize();

    const periodStart = this.getPeriodStart(new Date(), period);
    
    let relevantCalls = this.videoCalls.filter(call => 
      !sessionId || call.id === callId || call.title.includes(sessionId)
    );
    
    let relevantDocuments = this.realTimeDocuments.filter(doc => 
      !documentId || doc.id === documentId
    );

    if (callId) {
      relevantCalls = relevantCalls.filter(call => call.id === callId);
    }

    const totalParticipants = new Set(
      relevantCalls.flatMap(call => call.participants.map(p => p.id))
    ).size;

    const totalDuration = relevantCalls.reduce((sum, call) => {
      const endTime = call.endTime || new Date();
      return sum + (endTime.getTime() - call.startTime.getTime());
    }, 0);

    const messagesCount = relevantCalls.reduce((sum, call) => sum + call.chatMessages.length, 0);

    const documentsEdited = relevantDocuments.reduce((sum, doc) => sum + doc.changes.length, 0);

    const screenShares = this.screenShares.filter(share => 
      relevantCalls.some(call => call.id === share.callId)
    ).length;

    const annotationsCount = this.screenShares.reduce((sum, share) => sum + share.annotations.length, 0);

    return {
      sessionId,
      callId,
      documentId,
      period,
      metrics: {
        totalParticipants,
        averageEngagement: 75, // Mock calculation
        totalDuration,
        messagesCount,
        documentsEdited,
        screenShares,
        annotationsCount
      },
      participantMetrics: relevantCalls.flatMap(call => 
        call.participants.map(participant => ({
          userId: participant.id,
          participationScore: Math.random() * 100,
          speakingTime: Math.random() * 3600000, // Mock data
          messagesSent: call.chatMessages.filter(msg => msg.senderId === participant.id).length,
          documentsEdited: Math.floor(Math.random() * 10),
          annotationCount: Math.floor(Math.random() * 5)
        }))
      ),
      trends: {
        engagement: Array.from({ length: 24 }, () => Math.random() * 100),
        participation: Array.from({ length: 24 }, () => Math.random() * 50),
        activity: Array.from({ length: 24 }, () => Math.random() * 200),
        timestamps: Array.from({ length: 24 }, (_, i) => new Date(Date.now() - i * 3600000))
      }
    };
  }

  async getCollaborationToolsSummary(): Promise<{
    totalCalls: number;
    activeCalls: number;
    totalSessions: number;
    activeSessions: number;
    totalDocuments: number;
    activeDocuments: number;
    totalScreenShares: number;
    activeScreenShares: number;
    totalParticipants: number;
    totalMessages: number;
    averageCallDuration: number;
    collaborationMetrics: {
      documentsPerSession: number;
      messagesPerCall: number;
      annotationsPerShare: number;
      participantEngagement: number;
    };
  }> {
    await this.initialize();

    const totalCalls = this.videoCalls.length;
    const activeCalls = this.videoCalls.filter(call => call.status === 'active').length;
    const totalSessions = this.collaborationSessions.length;
    const activeSessions = this.collaborationSessions.filter(session => session.status === 'active').length;
    const totalDocuments = this.realTimeDocuments.length;
    const activeDocuments = this.realTimeDocuments.filter(doc => doc.collaborators.some(c => c.status === 'active')).length;
    const totalScreenShares = this.screenShares.length;
    const activeScreenShares = this.screenShares.filter(share => share.status === 'active').length;
    
    const totalParticipants = new Set(
      this.videoCalls.flatMap(call => call.participants.map(p => p.id))
    ).size;

    const totalMessages = this.videoCalls.reduce((sum, call) => sum + call.chatMessages.length, 0);

    const averageCallDuration = totalCalls > 0 
      ? this.videoCalls.reduce((sum, call) => {
          const duration = call.duration || (call.endTime ? call.endTime.getTime() - call.startTime.getTime() : 0);
          return sum + duration;
        }, 0) / totalCalls 
      : 0;

    const collaborationMetrics = {
      documentsPerSession: totalSessions > 0 ? totalDocuments / totalSessions : 0,
      messagesPerCall: totalCalls > 0 ? totalMessages / totalCalls : 0,
      annotationsPerShare: totalScreenShares > 0 
        ? this.screenShares.reduce((sum, share) => sum + share.annotations.length, 0) / totalScreenShares 
        : 0,
      participantEngagement: 78 // Mock calculation
    };

    return {
      totalCalls,
      activeCalls,
      totalSessions,
      activeSessions,
      totalDocuments,
      activeDocuments,
      totalScreenShares,
      activeScreenShares,
      totalParticipants,
      totalMessages,
      averageCallDuration,
      collaborationMetrics
    };
  }

  // Helper Methods
  private generateJoinUrl(): string {
    return `https://meet.syncscript.app/join/${this.generateMeetingId()}`;
  }

  private generateMeetingId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private getPeriodStart(date: Date, period: string): Date {
    const result = new Date(date);
    
    switch (period) {
      case 'hour':
        result.setHours(result.getHours() - 1);
        break;
      case 'day':
        result.setDate(result.getDate() - 1);
        break;
      case 'week':
        result.setDate(result.getDate() - 7);
        break;
      case 'month':
        result.setMonth(result.getMonth() - 1);
        break;
    }
    
    return result;
  }

  // Data Management
  private async loadData(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      const savedVideoCalls = localStorage.getItem('syncscript_video_calls');
      const savedScreenShares = localStorage.getItem('syncscript_screen_shares');
      const savedDocuments = localStorage.getItem('syncscript_real_time_documents');
      const savedSessions = localStorage.getItem('syncscript_collaboration_sessions');
      const savedChatMessages = localStorage.getItem('syncscript_chat_messages');

      if (savedVideoCalls) this.videoCalls = JSON.parse(savedVideoCalls);
      if (savedScreenShares) this.screenShares = JSON.parse(savedScreenShares);
      if (savedDocuments) this.realTimeDocuments = JSON.parse(savedDocuments);
      if (savedSessions) this.collaborationSessions = JSON.parse(savedSessions);
      if (savedChatMessages) this.chatMessages = JSON.parse(savedChatMessages);
    } catch (error) {
      console.error('Failed to load collaboration tools data:', error);
    }
  }

  private async saveData(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem('syncscript_video_calls', JSON.stringify(this.videoCalls));
      localStorage.setItem('syncscript_screen_shares', JSON.stringify(this.screenShares));
      localStorage.setItem('syncscript_real_time_documents', JSON.stringify(this.realTimeDocuments));
      localStorage.setItem('syncscript_collaboration_sessions', JSON.stringify(this.collaborationSessions));
      localStorage.setItem('syncscript_chat_messages', JSON.stringify(this.chatMessages));
    } catch (error) {
      console.error('Failed to save collaboration tools data:', error);
    }
  }

  private generateId(): string {
    return `collab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Singleton instance
let advancedCollaborationToolsManager: AdvancedCollaborationToolsManager | null = null;

export const getAdvancedCollaborationToolsManager = (): AdvancedCollaborationToolsManager => {
  if (!advancedCollaborationToolsManager) {
    advancedCollaborationToolsManager = new AdvancedCollaborationToolsManager();
  }
  return advancedCollaborationToolsManager;
};

export default AdvancedCollaborationToolsManager;
