export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          id: string
          new_data: Json | null
          old_data: Json | null
          record_id: string
          table_name: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          record_id: string
          table_name: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string
          table_name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      dogs: {
        Row: {
          breeder_id: string | null
          call_name: string | null
          coi_data: Json | null
          color: string | null
          created_at: string | null
          dam_id: string | null
          date_of_birth: string | null
          date_of_death: string | null
          gender: string | null
          genetics: Json | null
          health: Json | null
          id: string
          kennel_id: string | null
          land_of_birth: string | null
          land_of_standing: string | null
          media: Json | null
          name: string
          notes: unknown[] | null
          owner_id: string | null
          public_id: number
          reg_number: string | null
          sire_id: string | null
          slug: string
          titles: Json | null
          updated_at: string | null
        }
        Insert: {
          breeder_id?: string | null
          call_name?: string | null
          coi_data?: Json | null
          color?: string | null
          created_at?: string | null
          dam_id?: string | null
          date_of_birth?: string | null
          date_of_death?: string | null
          gender?: string | null
          genetics?: Json | null
          health?: Json | null
          id?: string
          kennel_id?: string | null
          land_of_birth?: string | null
          land_of_standing?: string | null
          media?: Json | null
          name: string
          notes?: unknown[] | null
          owner_id?: string | null
          public_id?: number
          reg_number?: string | null
          sire_id?: string | null
          slug: string
          titles?: Json | null
          updated_at?: string | null
        }
        Update: {
          breeder_id?: string | null
          call_name?: string | null
          coi_data?: Json | null
          color?: string | null
          created_at?: string | null
          dam_id?: string | null
          date_of_birth?: string | null
          date_of_death?: string | null
          gender?: string | null
          genetics?: Json | null
          health?: Json | null
          id?: string
          kennel_id?: string | null
          land_of_birth?: string | null
          land_of_standing?: string | null
          media?: Json | null
          name?: string
          notes?: unknown[] | null
          owner_id?: string | null
          public_id?: number
          reg_number?: string | null
          sire_id?: string | null
          slug?: string
          titles?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dogs_breeder_id_fkey"
            columns: ["breeder_id"]
            isOneToOne: false
            referencedRelation: "persons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dogs_dam_id_fkey"
            columns: ["dam_id"]
            isOneToOne: false
            referencedRelation: "dogs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dogs_kennel_id_fkey"
            columns: ["kennel_id"]
            isOneToOne: false
            referencedRelation: "kennels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dogs_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "persons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dogs_sire_id_fkey"
            columns: ["sire_id"]
            isOneToOne: false
            referencedRelation: "dogs"
            referencedColumns: ["id"]
          },
        ]
      }
      kennel_members: {
        Row: {
          created_at: string | null
          id: string
          kennel_id: string
          person_id: string
          role: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          kennel_id: string
          person_id: string
          role?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          kennel_id?: string
          person_id?: string
          role?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kennel_members_kennel_id_fkey"
            columns: ["kennel_id"]
            isOneToOne: false
            referencedRelation: "kennels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kennel_members_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "persons"
            referencedColumns: ["id"]
          },
        ]
      }
      kennels: {
        Row: {
          address_street: string | null
          city: string | null
          country: string
          created_at: string | null
          description: string | null
          email: string | null
          id: string
          media: Json | null
          name: string
          phone: string | null
          postal_code: string | null
          public_id: number
          slug: string
          state: string | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          address_street?: string | null
          city?: string | null
          country: string
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          media?: Json | null
          name: string
          phone?: string | null
          postal_code?: string | null
          public_id?: number
          slug: string
          state?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          address_street?: string | null
          city?: string | null
          country?: string
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          media?: Json | null
          name?: string
          phone?: string | null
          postal_code?: string | null
          public_id?: number
          slug?: string
          state?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      persons: {
        Row: {
          address_street: string | null
          bio: string | null
          city: string | null
          claimed_by_user_id: string | null
          country: string
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string
          media: Json | null
          notes: string | null
          phone: string | null
          postal_code: string | null
          public_id: number
          slug: string
          state: string | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          address_street?: string | null
          bio?: string | null
          city?: string | null
          claimed_by_user_id?: string | null
          country: string
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name: string
          media?: Json | null
          notes?: string | null
          phone?: string | null
          postal_code?: string | null
          public_id?: number
          slug: string
          state?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          address_street?: string | null
          bio?: string | null
          city?: string | null
          claimed_by_user_id?: string | null
          country?: string
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string
          media?: Json | null
          notes?: string | null
          phone?: string | null
          postal_code?: string | null
          public_id?: number
          slug?: string
          state?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "persons_claimed_by_user_id_fkey"
            columns: ["claimed_by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          role: string
          updated_at: string | null
          user_id: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          role?: string
          updated_at?: string | null
          user_id: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          role?: string
          updated_at?: string | null
          user_id?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
