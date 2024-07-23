use anchor_lang::prelude::*;

declare_id!("APP6a8Kk5cwhTY3XYKhVDBHZA86XWBhe4L7NthXiH5QY");

#[program]
pub mod temp_project {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
