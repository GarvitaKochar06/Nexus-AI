import uuid
from datetime import datetime, timezone
from sqlalchemy import (
    Column, String, Text, Boolean, Integer, Float, ForeignKey, DateTime, JSON
)
from sqlalchemy.orm import relationship
from app.core.database import Base

def generate_uuid() -> str:
    return str(uuid.uuid4())

def utc_now():
    return datetime.now(timezone.utc)

# ----------------- USERS & IDENTITY -----------------
class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    avatar_url = Column(Text, nullable=True)
    role = Column(String(50), default="user", nullable=False) # 'user', 'pro', 'campus_admin', 'super_admin'
    is_verified = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=utc_now, nullable=False)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now, nullable=False)

    # Relationships
    wallet = relationship("Wallet", back_populates="user", uselist=False, cascade="all, delete-orphan")
    subscriptions = relationship("Subscription", back_populates="user", cascade="all, delete-orphan")
    memories = relationship("Memory", back_populates="user", cascade="all, delete-orphan")
    tasks = relationship("Task", back_populates="user", cascade="all, delete-orphan")
    habits = relationship("Habit", back_populates="user", cascade="all, delete-orphan")
    career_profile = relationship("CareerProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    projects = relationship("Project", back_populates="user", cascade="all, delete-orphan")
    resumes = relationship("Resume", back_populates="user", cascade="all, delete-orphan")
    job_applications = relationship("JobApplication", back_populates="user", cascade="all, delete-orphan")
    documents = relationship("Document", back_populates="user", cascade="all, delete-orphan")
    conversations = relationship("Conversation", back_populates="user", cascade="all, delete-orphan")
    cyber_checklists = relationship("CyberChecklist", back_populates="user", cascade="all, delete-orphan")
    security_findings = relationship("SecurityFinding", back_populates="user", cascade="all, delete-orphan")
    reminders = relationship("Reminder", back_populates="user", cascade="all, delete-orphan")
    audit_logs = relationship("AuditLog", back_populates="user", cascade="all, delete-orphan")
    # Knowledge Graph nodes and edges
    knowledge_nodes = relationship("KnowledgeNode", back_populates="user", cascade="all, delete-orphan")
    knowledge_edges = relationship("KnowledgeEdge", back_populates="user", cascade="all, delete-orphan")

# ----------------- MONETIZATION & WALLET -----------------
class SubscriptionPlan(Base):
    __tablename__ = "subscription_plans"

    id = Column(String(50), primary_key=True) # 'free', 'plus_monthly', 'pro_monthly'
    tier = Column(String(50), nullable=False) # 'free', 'plus', 'pro', 'campus'
    name = Column(String(100), nullable=False)
    price_inr = Column(Float, nullable=False)
    billing_period = Column(String(20), default="monthly") # 'monthly', 'annual'
    ai_credits_monthly = Column(Integer, nullable=False)
    features_json = Column(JSON, default=dict)
    is_active = Column(Boolean, default=True)

class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    plan_id = Column(String(50), ForeignKey("subscription_plans.id"), nullable=False)
    status = Column(String(50), default="active", nullable=False) # 'active', 'canceled', 'past_due'
    current_period_start = Column(DateTime, default=utc_now)
    current_period_end = Column(DateTime, nullable=False)
    cancel_at_period_end = Column(Boolean, default=False)
    gateway_subscription_id = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=utc_now)

    user = relationship("User", back_populates="subscriptions")
    plan = relationship("SubscriptionPlan")

class Wallet(Base):
    __tablename__ = "wallets"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    credits_balance = Column(Integer, default=50, nullable=False)
    total_credits_purchased = Column(Integer, default=0, nullable=False)
    total_credits_spent = Column(Integer, default=0, nullable=False)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now)

    user = relationship("User", back_populates="wallet")
    transactions = relationship("WalletTransaction", back_populates="wallet", cascade="all, delete-orphan")

class WalletTransaction(Base):
    __tablename__ = "wallet_transactions"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    wallet_id = Column(String(36), ForeignKey("wallets.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    amount = Column(Integer, nullable=False) # +ve for grant, -ve for deduction
    balance_after = Column(Integer, nullable=False)
    transaction_type = Column(String(50), nullable=False) # 'grant', 'purchase', 'deduct', 'refund'
    feature_name = Column(String(100), nullable=False) # 'resume_tailor', 'chat', 'doc_rag'
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=utc_now)

    wallet = relationship("Wallet", back_populates="transactions")

class PaymentOrder(Base):
    __tablename__ = "payment_orders"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    gateway_order_id = Column(String(255), unique=True, nullable=False)
    gateway_provider = Column(String(50), default="razorpay")
    amount = Column(Float, nullable=False)
    currency = Column(String(10), default="INR")
    status = Column(String(50), default="created") # 'created', 'paid', 'failed'
    signature = Column(String(512), nullable=True)
    created_at = Column(DateTime, default=utc_now)

# ----------------- PERSONAL MEMORY ENGINE -----------------
class Memory(Base):
    __tablename__ = "memories"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    category = Column(String(50), default="fact", nullable=False) # 'preference', 'goal', 'skill', 'fact', 'achievement'
    content = Column(Text, nullable=False)
    source = Column(String(100), default="user_chat")
    confidence_score = Column(Float, default=1.0)
    embedding = Column(JSON, nullable=True)  # local vector embedding

    consent_given = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=utc_now)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now)

    user = relationship("User", back_populates="memories")

# ----------------- LIFEOS -----------------
class Task(Base):
    __tablename__ = "tasks"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    priority = Column(String(50), default="medium") # 'low', 'medium', 'high', 'urgent'
    status = Column(String(50), default="todo") # 'todo', 'in_progress', 'completed', 'archived'
    due_date = Column(DateTime, nullable=True)
    estimated_minutes = Column(Integer, default=30)
    is_ai_generated = Column(Boolean, default=False)
    created_at = Column(DateTime, default=utc_now)

    user = relationship("User", back_populates="tasks")

class Habit(Base):
    __tablename__ = "habits"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(150), nullable=False)
    frequency = Column(String(50), default="daily")
    streak_count = Column(Integer, default=0)
    target_days_per_week = Column(Integer, default=7)
    created_at = Column(DateTime, default=utc_now)

    user = relationship("User", back_populates="habits")

# ----------------- CAREEROS & RESUME -----------------
class CareerProfile(Base):
    __tablename__ = "career_profiles"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    headline = Column(String(255), nullable=True)
    target_role = Column(String(255), nullable=True)
    years_experience = Column(Float, default=0.0)
    github_url = Column(Text, nullable=True)
    linkedin_url = Column(Text, nullable=True)
    portfolio_url = Column(Text, nullable=True)
    bio = Column(Text, nullable=True)
    verified_status = Column(Boolean, default=False)

    user = relationship("User", back_populates="career_profile")
    skills = relationship("UserSkill", back_populates="profile", cascade="all, delete-orphan")

class UserSkill(Base):
    __tablename__ = "user_skills"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    profile_id = Column(String(36), ForeignKey("career_profiles.id", ondelete="CASCADE"), nullable=False)
    skill_name = Column(String(100), nullable=False)
    category = Column(String(50), default="technical")
    proficiency_level = Column(Integer, default=3) # 1-5 scale
    is_verified = Column(Boolean, default=False)

    profile = relationship("CareerProfile", back_populates="skills")

class Project(Base):
    __tablename__ = "projects"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    technologies = Column(JSON, default=list)
    repo_url = Column(Text, nullable=True)
    live_url = Column(Text, nullable=True)
    is_featured = Column(Boolean, default=False)
    created_at = Column(DateTime, default=utc_now)

    user = relationship("User", back_populates="projects")

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(200), nullable=False)
    parsed_json = Column(JSON, default=dict)
    raw_text = Column(Text, nullable=True)
    is_master = Column(Boolean, default=False)
    created_at = Column(DateTime, default=utc_now)

    user = relationship("User", back_populates="resumes")
    versions = relationship("ResumeVersion", back_populates="resume", cascade="all, delete-orphan")

class ResumeVersion(Base):
    __tablename__ = "resume_versions"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    resume_id = Column(String(36), ForeignKey("resumes.id", ondelete="CASCADE"), nullable=False)
    target_job_title = Column(String(255), nullable=True)
    target_company = Column(String(255), nullable=True)
    ats_score = Column(Integer, default=75)
    tailored_json = Column(JSON, default=dict)
    changes_summary = Column(Text, nullable=True)
    created_at = Column(DateTime, default=utc_now)

    resume = relationship("Resume", back_populates="versions")

# ----------------- JOBS & OPPORTUNITIES -----------------
class JobOpportunity(Base):
    __tablename__ = "job_opportunities"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    company_name = Column(String(200), nullable=False)
    job_title = Column(String(255), nullable=False)
    location = Column(String(200), nullable=True)
    employment_type = Column(String(50), default="full_time")
    salary_range = Column(String(100), nullable=True)
    description = Column(Text, nullable=False)
    required_skills = Column(JSON, default=list)
    source_url = Column(Text, nullable=False)
    created_at = Column(DateTime, default=utc_now)

class JobApplication(Base):
    __tablename__ = "job_applications"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    opportunity_id = Column(String(36), ForeignKey("job_opportunities.id", ondelete="SET NULL"), nullable=True)
    company_name = Column(String(200), nullable=False)
    job_title = Column(String(255), nullable=False)
    status = Column(String(50), default="saved") # 'saved', 'ready_to_apply', 'applied', 'interview', 'offer', 'rejected'
    applied_date = Column(DateTime, nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=utc_now)
    interview_date = Column(DateTime, nullable=True)
    follow_up_date = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="job_applications")
    opportunity = relationship("JobOpportunity")

# ----------------- SECOND BRAIN -----------------
class Document(Base):
    __tablename__ = "documents"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    file_name = Column(String(255), nullable=False)
    file_type = Column(String(50), nullable=False)
    file_size_bytes = Column(Integer, default=0)
    summary = Column(Text, nullable=True)
    total_chunks = Column(Integer, default=0)
    created_at = Column(DateTime, default=utc_now)

    user = relationship("User", back_populates="documents")

# ----------------- CONVERSATIONS & CHAT -----------------
class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), default="New Intelligence Session")
    context_type = Column(String(50), default="general")
    created_at = Column(DateTime, default=utc_now)

    user = relationship("User", back_populates="conversations")
    messages = relationship("Message", back_populates="conversation", cascade="all, delete-orphan")

class Message(Base):
    __tablename__ = "messages"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    conversation_id = Column(String(36), ForeignKey("conversations.id", ondelete="CASCADE"), nullable=False)
    sender = Column(String(20), nullable=False) # 'user', 'assistant', 'system'
    content = Column(Text, nullable=False)
    referenced_sources = Column(JSON, default=list)
    tokens_consumed = Column(Integer, default=0)
    created_at = Column(DateTime, default=utc_now)

    conversation = relationship("Conversation", back_populates="messages")

# ----------------- AI AUDIT & USAGE -----------------
class AIUsageLog(Base):
    __tablename__ = "ai_usage_logs"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    provider = Column(String(50), default="gemini")
    model_name = Column(String(100), nullable=False)
    feature = Column(String(100), nullable=False)
    prompt_tokens = Column(Integer, default=0)
    completion_tokens = Column(Integer, default=0)
    total_tokens = Column(Integer, default=0)
    estimated_cost_usd = Column(Float, default=0.0)
    created_at = Column(DateTime, default=utc_now)

# ----------------- LEARNING HUB -----------------
class LearningTopic(Base):
    __tablename__ = "learning_topics"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    level = Column(String(20), default="beginner")  # beginner, intermediate, advanced
    resource_url = Column(Text, nullable=True)  # verified link if any
    created_at = Column(DateTime, default=utc_now)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    user = relationship("User", back_populates="learning_topics")
    progress_entries = relationship("LearningProgress", back_populates="topic", cascade="all, delete-orphan")
    quizzes = relationship("Quiz", back_populates="topic", cascade="all, delete-orphan")

class LearningProgress(Base):
    __tablename__ = "learning_progress"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    topic_id = Column(String(36), ForeignKey("learning_topics.id"), nullable=False)
    completed = Column(Boolean, default=False)
    completion_date = Column(DateTime, nullable=True)
    progress_percent = Column(Float, default=0.0)
    created_at = Column(DateTime, default=utc_now)
    user = relationship("User", back_populates="learning_progress")
    topic = relationship("LearningTopic", back_populates="progress_entries")

class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    topic_id = Column(String(36), ForeignKey("learning_topics.id"), nullable=False)
    title = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=utc_now)
    topic = relationship("LearningTopic", back_populates="quizzes")
    questions = relationship("QuizQuestion", back_populates="quiz", cascade="all, delete-orphan")

class QuizQuestion(Base):
    __tablename__ = "quiz_questions"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    quiz_id = Column(String(36), ForeignKey("quizzes.id"), nullable=False)
    question_text = Column(Text, nullable=False)
    options = Column(JSON, default=list)  # list of strings
    correct_option = Column(Integer, nullable=False)  # index of correct option
    quiz = relationship("Quiz", back_populates="questions")

class QuizAnswer(Base):
    __tablename__ = "quiz_answers"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    question_id = Column(String(36), ForeignKey("quiz_questions.id"), nullable=False)
    selected_option = Column(Integer, nullable=False)
    is_correct = Column(Boolean, nullable=False)
    answered_at = Column(DateTime, default=utc_now)
    user = relationship("User", back_populates="quiz_answers")
    question = relationship("QuizQuestion")

# ----------------- CYBER HUB -----------------

# Knowledge Graph models
class KnowledgeNode(Base):
    __tablename__ = "knowledge_nodes"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    label = Column(String(255), nullable=False)
    type = Column(String(50), nullable=False)  # e.g., "task", "document", "skill", etc.
    metadata_json = Column(JSON, default=dict)  # optional extra data
    created_at = Column(DateTime, default=utc_now)

    user = relationship("User", back_populates="knowledge_nodes")
    outgoing = relationship(
        "KnowledgeEdge",
        foreign_keys="KnowledgeEdge.source_node_id",
        back_populates="source_node",
        cascade="all, delete-orphan",
    )
    incoming = relationship(
        "KnowledgeEdge",
        foreign_keys="KnowledgeEdge.target_node_id",
        back_populates="target_node",
        cascade="all, delete-orphan",
    )

class KnowledgeEdge(Base):
    __tablename__ = "knowledge_edges"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    source_node_id = Column(String(36), ForeignKey("knowledge_nodes.id", ondelete="CASCADE"), nullable=False)
    target_node_id = Column(String(36), ForeignKey("knowledge_nodes.id", ondelete="CASCADE"), nullable=False)
    relationship_type = Column(String(100), nullable=False)  # e.g., "depends_on", "related_to"
    created_at = Column(DateTime, default=utc_now)

    user = relationship("User", back_populates="knowledge_edges")
    source_node = relationship("KnowledgeNode", foreign_keys=[source_node_id], back_populates="outgoing")
    target_node = relationship("KnowledgeNode", foreign_keys=[target_node_id], back_populates="incoming")
from sqlalchemy import Enum as SqlEnum
import enum

class CyberFindingSeverity(enum.Enum):
    low = "low"
    medium = "medium"
    high = "high"
    critical = "critical"

class CyberFindingStatus(enum.Enum):
    open = "open"
    in_progress = "in_progress"
    resolved = "resolved"
    dismissed = "dismissed"

class CyberChecklist(Base):
    __tablename__ = "cyber_checklists"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    # JSON list of items: each item dict {name:str, description:str, completed:bool}
    items = Column(JSON, default=list)
    score = Column(Float, default=0.0)  # estimate 0-100
    created_at = Column(DateTime, default=utc_now)

    user = relationship("User", back_populates="cyber_checklists")

class SecurityFinding(Base):
    __tablename__ = "security_findings"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    project_id = Column(String(36), ForeignKey("projects.id", ondelete="SET NULL"), nullable=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    severity = Column(SqlEnum(CyberFindingSeverity), default=CyberFindingSeverity.low, nullable=False)
    status = Column(SqlEnum(CyberFindingStatus), default=CyberFindingStatus.open, nullable=False)
    remediation = Column(Text, nullable=True)
    is_simulated = Column(Boolean, default=True, nullable=False)  # true unless user uploads verified scan
    created_at = Column(DateTime, default=utc_now)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now)

    user = relationship("User", back_populates="security_findings")
    project = relationship("Project", back_populates="security_findings")

class LearningModule(Base):
    __tablename__ = "learning_modules"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    title = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)  # e.g., "phishing", "auth", "secure_coding"
    content = Column(Text, nullable=False)  # markdown content
    resource_url = Column(Text, nullable=True)
    created_at = Column(DateTime, default=utc_now)

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    action = Column(String(100), nullable=False)
    target_type = Column(String(50), nullable=True)  # e.g., "user", "subscription"
    target_id = Column(String(36), nullable=True)
    details = Column(JSON, default=dict)
    created_at = Column(DateTime, default=utc_now)

    user = relationship("User", back_populates="audit_logs")
